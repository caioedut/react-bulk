import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  RbkDocEntry,
  RbkDocExample,
  RbkDocKind,
  RbkDocNote,
  RbkDocProp,
  RbkExportItem,
  RbkIndex,
  RbkThemeInfo,
} from './types.js';

// `src/` when running with tsx, `dist/` when running the published build.
const HERE = path.dirname(fileURLToPath(import.meta.url));
const MCP_ROOT = path.resolve(HERE, '..');
const REPO_ROOT = path.resolve(MCP_ROOT, '../..');

export const INDEX_FILE = path.join(HERE, 'rbk-index.json');

/** Exported but not ready for use: kept out of the index (docs, components, types, theme). */
export const UNSTABLE_COMPONENTS = ['GrowBox', 'Slider'];
const DOCS_URL = 'https://rbk.caioedut.com/docs';

const DOCS_ROOT = path.join(REPO_ROOT, 'docs/docs');
const CORE_INDEX_PATH = path.join(REPO_ROOT, 'packages/core/src/index.ts');
const CORE_TYPES_PATH = path.join(REPO_ROOT, 'packages/core/src/types.ts');
const WEB_INDEX_PATH = path.join(REPO_ROOT, 'packages/web/src/index.ts');
const NATIVE_INDEX_PATH = path.join(REPO_ROOT, 'packages/native/src/index.ts');
const STYLE_CONSTANTS_PATH = path.join(REPO_ROOT, 'packages/core/src/styles/constants.ts');
const BASE_THEME_PATH = path.join(REPO_ROOT, 'packages/core/src/themes/base.ts');

const SOURCE_FILES = [
  CORE_INDEX_PATH,
  CORE_TYPES_PATH,
  WEB_INDEX_PATH,
  NATIVE_INDEX_PATH,
  STYLE_CONSTANTS_PATH,
  BASE_THEME_PATH,
];

function walkFiles(dir: string, ext: string): string[] {
  const out: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkFiles(fullPath, ext));
      continue;
    }
    if (entry.isFile() && fullPath.endsWith(ext)) {
      out.push(fullPath);
    }
  }
  return out;
}

function readPackageVersion(): string {
  try {
    return JSON.parse(readFileSync(path.join(MCP_ROOT, 'package.json'), 'utf8')).version ?? '0.0.0';
  } catch {
    return '0.0.0';
  }
}

/** `**\`number\` | [\`BadgeProps\`](/docs/...)** <br/>` -> `number | BadgeProps` */
function cleanMarkdown(value: string): string {
  return value
    .replace(/<br\s*\/?>/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function toPascal(value: string): string {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('');
}

function toCamel(value: string): string {
  const pascal = toPascal(value);
  return pascal[0].toLowerCase() + pascal.slice(1);
}

type ParsedProps = { props: RbkDocProp[]; events: RbkDocProp[]; styles: RbkDocProp[] };

function extractProps(content: string): ParsedProps {
  const result: ParsedProps = { props: [], events: [], styles: [] };
  const headings = [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => ({ index: m.index ?? 0, title: m[1].trim() }));
  const matches = [...content.matchAll(/### \*\*`([^`]+)`\*\*/g)];
  for (let i = 0; i < matches.length; i += 1) {
    const current = matches[i];
    const next = matches[i + 1];
    const start = current.index ?? 0;
    const nextHeading = headings.find((h) => h.index > start)?.index ?? content.length;
    const end = Math.min(next?.index ?? content.length, nextHeading);
    const block = content.slice(start, end);
    const typeMatch = block.match(/➤ Type:\s*(.+)$/m);
    const defaultMatch = block.match(/➤ Default:\s*(.+)$/m);
    const defaults = Object.fromEntries(
      [...block.matchAll(/➤ Default ([A-Za-z]+):\s*(.+)$/gm)].map((m) => [m[1].toLowerCase(), cleanMarkdown(m[2])]),
    );
    const details = block.match(/```[a-z]*\r?\n([\s\S]*?)```/)?.[1]?.trimEnd();
    let platform: RbkDocProp['platform'] = 'cross';
    if (/web only/i.test(block)) platform = 'web';
    if (/native only/i.test(block)) platform = 'native';
    const description = block
      .split('\n')
      .slice(1, 6)
      .map((line) => line.trim())
      .find((line) => line && !line.startsWith('➤') && !line.startsWith('---') && !line.startsWith('#'));
    const prop: RbkDocProp = {
      name: current[1],
      type: typeMatch ? cleanMarkdown(typeMatch[1]) : undefined,
      defaultValue: defaultMatch ? cleanMarkdown(defaultMatch[1]) : undefined,
      ...(Object.keys(defaults).length && { defaults }),
      platform,
      description: description ? cleanMarkdown(description) : undefined,
      ...(details && { details }),
    };
    const section = [...headings].reverse().find((h) => h.index < start)?.title ?? '';
    if (/event/i.test(section)) result.events.push(prop);
    else if (/^styles?$/i.test(section)) result.styles.push(prop);
    else result.props.push(prop);
  }
  return result;
}

/** `## Sections` that explain behavior without listing `### **\`prop\`**` entries. */
function extractNotes(content: string): RbkDocNote[] {
  const headings = [...content.matchAll(/^##\s+(.+)$/gm)];
  const notes: RbkDocNote[] = [];
  for (let i = 0; i < headings.length; i += 1) {
    const title = headings[i][1].trim();
    if (/^(import|examples?|usage)$/i.test(title)) continue;
    const start = (headings[i].index ?? 0) + headings[i][0].length;
    const body = content.slice(start, headings[i + 1]?.index ?? content.length).trim();
    if (!body || /### \*\*`/.test(body)) continue;
    notes.push({ title, content: body });
  }
  return notes;
}

function extractExamples(content: string): RbkDocExample[] {
  const examples: RbkDocExample[] = [];
  const headings = [...content.matchAll(/^#{2,4}\s+(.+)$/gm)].map((m) => ({ index: m.index ?? 0, title: m[1].trim() }));
  for (const m of content.matchAll(/```jsx live\r?\n([\s\S]*?)```/g)) {
    const start = m.index ?? 0;
    const title = [...headings].reverse().find((h) => h.index < start)?.title ?? 'Example';
    examples.push({ title, code: m[1].trimEnd() });
  }
  return examples;
}

function summarize(content: string): string {
  const body = content.replace(/^---[\s\S]*?---/, '');
  const lines = body
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#') && !line.startsWith('---'));
  return (lines[0] || '').slice(0, 240);
}

type Symbols = { components: Set<string>; hooks: Set<string>; types: Set<string> };

function parseDoc(filePath: string, symbols: Symbols): RbkDocEntry {
  const content = readFileSync(filePath, 'utf8');
  const title = content.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? path.basename(filePath, '.md');
  const sections = [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
  const rel = path.relative(DOCS_ROOT, filePath).replace(/\\/g, '/');
  const slug = rel.replace(/\.md$/, '');
  const category = rel.includes('/') ? rel.split('/')[0] : 'misc';
  const base = path.basename(slug);

  let kind: RbkDocKind = 'guide';
  let symbol: string | null = null;
  if (symbols.components.has(toPascal(base))) {
    kind = 'component';
    symbol = toPascal(base);
  } else if (symbols.hooks.has(toCamel(base))) {
    kind = 'hook';
    symbol = toCamel(base);
  } else if (category === 'type-reference') {
    kind = 'type';
    symbol = toPascal(base);
  }

  return {
    title,
    slug,
    url: `${DOCS_URL}/${slug}`,
    category,
    kind,
    symbol,
    summary: summarize(content),
    content,
    sections,
    ...extractProps(content),
    notes: extractNotes(content),
    examples: extractExamples(content),
  };
}

function parseCoreExports(filePath: string): RbkExportItem[] {
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const exports: RbkExportItem[] = [];
  let pendingInternal = false;
  for (const line of lines) {
    if (line.includes('/** @internal */')) {
      pendingInternal = true;
      continue;
    }
    const named = line.match(/export\s+\{\s+default\s+as\s+([A-Za-z0-9_]+)\s+\}\s+from\s+'([^']+)'/);
    const wildcard = line.match(/export\s+\*\s+from\s+'([^']+)'/);
    if (named) {
      exports.push({ name: named[1], source: named[2], internal: pendingInternal });
      pendingInternal = false;
      continue;
    }
    if (wildcard) {
      exports.push({ name: '*', source: wildcard[1], internal: pendingInternal });
      pendingInternal = false;
    }
  }
  return exports;
}

function parseTypeSources(filePath: string): Record<string, string> {
  const content = readFileSync(filePath, 'utf8');
  const sources: Record<string, string> = {};
  const unstable = new RegExp(`^(${UNSTABLE_COMPONENTS.join('|')})[A-Z]`);
  const starts = [...content.matchAll(/^export\s+(?:type|interface)\s+([A-Za-z0-9_]+)/gm)];
  for (let i = 0; i < starts.length; i += 1) {
    if (unstable.test(starts[i][1])) continue;
    const start = starts[i].index ?? 0;
    const end = starts[i + 1]?.index ?? content.length;
    sources[starts[i][1]] = content
      .slice(start, end)
      .trim()
      .split('\n')
      .filter((line) => !UNSTABLE_COMPONENTS.some((name) => new RegExp(`^\\s+${name}:`).test(line)))
      .join('\n');
  }
  return sources;
}

function parsePlatformComponents(content: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const m of content.matchAll(/export const ([A-Za-z0-9_]+) = ([A-Za-z0-9_]+)/g)) {
    if (!UNSTABLE_COMPONENTS.includes(m[1])) map[m[1]] = m[2];
  }
  return map;
}

/** `export { ReactBulk, useDimensions, useTheme };` */
function parsePlatformNamedExports(content: string): string[] {
  const names = new Set<string>();
  for (const m of content.matchAll(/export\s+\{([^}]+)\}\s*;/g)) {
    for (const part of m[1].split(',')) {
      const name = part.trim().split(/\s+as\s+/).pop();
      if (name) names.add(name);
    }
  }
  return [...names].sort();
}

function parseStringArray(content: string, constName: string): string[] {
  const regex = new RegExp(`export const ${constName} = \\[([\\s\\S]*?)\\](?: as const)?;`, 'm');
  const block = content.match(regex)?.[1];
  if (!block) return [];
  return [...block.matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

function parseAllStringArrays(content: string): string[] {
  const names = [...content.matchAll(/^export const ([A-Za-z0-9_]+) = \[/gm)].map((m) => m[1]);
  return [...new Set(names.flatMap((name) => parseStringArray(content, name)))].sort();
}

function parseAliasesMap(content: string): Record<string, string> {
  const aliasesBlock = content.match(/export const aliases = \{([\s\S]*?)\};/m)?.[1];
  if (!aliasesBlock) return {};
  const map: Record<string, string> = {};
  for (const m of aliasesBlock.matchAll(/([A-Za-z0-9_]+):\s*'([^']+)'/g)) {
    map[m[2]] = m[1];
  }
  return map;
}

function buildPropAliases(content: string): Record<string, string> {
  const aliasMap: Record<string, string> = {};
  const customSpacings = parseStringArray(content, 'customSpacings');
  const spacingBase: Record<string, string> = {
    i: 'inset',
    t: 'top',
    b: 'bottom',
    l: 'left',
    r: 'right',
    m: 'margin',
    mt: 'marginTop',
    mb: 'marginBottom',
    ml: 'marginLeft',
    mr: 'marginRight',
    mh: 'marginHorizontal',
    mx: 'marginHorizontal',
    mv: 'marginVertical',
    my: 'marginVertical',
    p: 'padding',
    pt: 'paddingTop',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    pr: 'paddingRight',
    ph: 'paddingHorizontal',
    px: 'paddingHorizontal',
    pv: 'paddingVertical',
    py: 'paddingVertical',
    g: 'gap',
    gx: 'columnGap',
    gy: 'rowGap',
  };
  for (const key of customSpacings) {
    if (spacingBase[key]) aliasMap[spacingBase[key]] = key;
  }
  aliasMap.flexDirection = 'direction';
  aliasMap.flexGrow = 'grow';
  aliasMap.flexShrink = 'shrink';
  aliasMap.flexBasis = 'basis';
  aliasMap.alignSelf = 'align';
  aliasMap.justifySelf = 'justify';
  return aliasMap;
}

/** Same renaming as the `*` parser in `packages/core/src/libs/cometta.ts`. */
function spacingAliasToProp(alias: string): string {
  if (['g', 'gx', 'gy'].includes(alias)) return alias === 'gy' ? 'rowGap' : alias === 'gx' ? 'columnGap' : 'gap';
  return alias
    .replace(/^i$/, 'inset')
    .replace(/^(.)t$/, '$1Top')
    .replace(/^(.)b$/, '$1Bottom')
    .replace(/^(.)l$/, '$1Left')
    .replace(/^(.)r$/, '$1Right')
    .replace(/^(.)h$/, '$1Horizontal')
    .replace(/^(.)v$/, '$1Vertical')
    .replace(/^(.)x$/, '$1Horizontal')
    .replace(/^(.)y$/, '$1Vertical')
    .replace(/^m/, 'margin')
    .replace(/^p/, 'padding')
    .replace(/^t$/, 'top')
    .replace(/^b$/, 'bottom')
    .replace(/^l$/, 'left')
    .replace(/^r$/, 'right');
}

function buildAliasTable(content: string): Record<string, string> {
  const table: Record<string, string> = {};
  for (const alias of parseStringArray(content, 'customSpacings')) {
    table[alias] = spacingAliasToProp(alias);
  }
  const aliasesBlock = content.match(/export const aliases = \{([\s\S]*?)\};/m)?.[1] ?? '';
  for (const m of aliasesBlock.matchAll(/([A-Za-z0-9_]+):\s*'([^']+)'/g)) {
    table[m[1]] = m[2];
  }
  return table;
}

/** Body of `key: { ... }` (single nesting level) inside `content`. */
function objectBlock(content: string, key: string): string {
  return content.match(new RegExp(`\\b${key}:\\s*\\{([^{}]*)\\}`, 'm'))?.[1] ?? '';
}

function numberEntries(block: string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const m of block.matchAll(/([A-Za-z0-9_]+):\s*(-?[\d.]+)/g)) {
    out[m[1]] = Number(m[2]);
  }
  return out;
}

function parseTheme(baseTheme: string, typeSources: Record<string, string>): RbkThemeInfo {
  const colorsStart = baseTheme.indexOf('colors: {');
  const colorsEnd = baseTheme.indexOf('breakpoints: {');
  const colorsBlock = colorsStart >= 0 ? baseTheme.slice(colorsStart, colorsEnd > colorsStart ? colorsEnd : undefined) : '';
  const colorTokens = [...colorsBlock.matchAll(/^\s+([A-Za-z][A-Za-z0-9]*):\s*['"]#/gm)].map((m) => m[1]);
  const commonColors = Object.keys(
    Object.fromEntries([...objectBlock(colorsBlock, 'common').matchAll(/([A-Za-z0-9_]+):/g)].map((m) => [m[1], true])),
  );
  const typeSource = typeSources.ThemeProps ?? '';
  const componentsBlock = typeSource.slice(typeSource.indexOf('components: {'));
  const themableComponents = [...componentsBlock.matchAll(/^\s+([A-Za-z0-9_]+):\s*ThemeComponentProps/gm)]
    .map((m) => m[1])
    .filter((name) => !UNSTABLE_COMPONENTS.includes(name));
  return {
    typeSource,
    shape: numberEntries(objectBlock(baseTheme, 'shape')),
    typography: numberEntries(objectBlock(baseTheme, 'typography')),
    breakpoints: numberEntries(objectBlock(baseTheme, 'breakpoints')),
    colorTokens: [...new Set(colorTokens.filter((token) => !commonColors.includes(token)))],
    commonColors,
    themableComponents,
  };
}

/** True when running inside the react-bulk monorepo (sources available). */
export function hasSources(): boolean {
  return existsSync(DOCS_ROOT) && SOURCE_FILES.every((file) => existsSync(file));
}

export function buildIndexFromSources(): RbkIndex {
  const coreExports = parseCoreExports(CORE_INDEX_PATH).filter(
    (item) => !UNSTABLE_COMPONENTS.some((name) => item.name.startsWith(name)),
  );
  const publicExports = coreExports.filter((item) => !item.internal).map((item) => item.name);
  const hooks = publicExports.filter((name) => /^use[A-Z]/.test(name));
  const typeSources = parseTypeSources(CORE_TYPES_PATH);
  const typeNames = Object.keys(typeSources).sort();
  const webSource = readFileSync(WEB_INDEX_PATH, 'utf8');
  const nativeSource = readFileSync(NATIVE_INDEX_PATH, 'utf8');
  const webComponents = parsePlatformComponents(webSource);
  const nativeComponents = parsePlatformComponents(nativeSource);
  const webExports = parsePlatformNamedExports(webSource);
  const nativeExports = parsePlatformNamedExports(nativeSource);
  const symbols: Symbols = {
    components: new Set([...Object.keys(webComponents), ...Object.keys(nativeComponents)]),
    hooks: new Set([...hooks, ...webExports, ...nativeExports].filter((name) => /^use[A-Z]/.test(name))),
    types: new Set(typeNames),
  };
  const unstableSlugs = UNSTABLE_COMPONENTS.map((name) => name.replace(/[A-Z]/g, (c, i) => (i ? '-' : '') + c.toLowerCase()));
  const docs = walkFiles(DOCS_ROOT, '.md')
    .filter((file) => !unstableSlugs.includes(path.basename(file, '.md')))
    .map((file) => parseDoc(file, symbols))
    .sort((a, b) => a.slug.localeCompare(b.slug));
  const styleConstants = readFileSync(STYLE_CONSTANTS_PATH, 'utf8');
  const theme = parseTheme(readFileSync(BASE_THEME_PATH, 'utf8'), typeSources);
  return {
    generatedAt: new Date().toISOString(),
    version: readPackageVersion(),
    docs,
    coreExports,
    publicExports,
    typeNames,
    typeSources,
    webComponents,
    nativeComponents,
    webExports,
    nativeExports,
    hooks: [...symbols.hooks].sort(),
    themeTokens: [...theme.colorTokens, ...theme.commonColors].sort(),
    theme,
    styleAliases: parseAliasesMap(styleConstants),
    propAliases: buildPropAliases(styleConstants),
    aliasTable: buildAliasTable(styleConstants),
    styleProps: parseAllStringArrays(styleConstants),
  };
}

let cached: { key: number; index: RbkIndex } | null = null;

function computeKey(): number {
  const files = [...SOURCE_FILES, ...walkFiles(DOCS_ROOT, '.md')];
  return files.reduce((acc, file) => acc + statSync(file).mtimeMs, 0);
}

/**
 * Inside the monorepo the index is built live from docs and sources (and rebuilt when they change).
 * Anywhere else (published package) it is loaded from the `rbk-index.json` generated at build time.
 */
export function buildIndex(): RbkIndex {
  if (hasSources()) {
    const key = computeKey();
    if (cached && cached.key === key) return cached.index;
    cached = { key, index: buildIndexFromSources() };
    return cached.index;
  }
  if (cached) return cached.index;
  if (!existsSync(INDEX_FILE)) {
    throw new Error(`[react-bulk-mcp] index not found: ${INDEX_FILE}`);
  }
  cached = { key: 0, index: JSON.parse(readFileSync(INDEX_FILE, 'utf8')) as RbkIndex };
  return cached.index;
}

const norm = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Finds a doc by exported name (`ButtonGroup`), title (`Button Group`) or slug (`forms/button-group`). */
export function findDoc(index: RbkIndex, query: string, kind?: RbkDocKind): RbkDocEntry | undefined {
  const q = norm(query);
  const docs = kind ? index.docs.filter((doc) => doc.kind === kind) : index.docs;
  return (
    docs.find((doc) => doc.slug === query) ||
    docs.find((doc) => doc.symbol && norm(doc.symbol) === q) ||
    docs.find((doc) => norm(doc.title) === q) ||
    docs.find((doc) => norm(path.basename(doc.slug)) === q)
  );
}
