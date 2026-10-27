import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

import { UNSTABLE_COMPONENTS } from './indexer.js';
import { Platform, RbkDocProp, RbkIndex } from './types.js';

type ValidationIssue = {
  kind: 'error' | 'warning';
  message: string;
  file?: string;
};

type JsxTag = { name: string; attrs: string[] };

// Props handled by React itself or accepted by every Box-based component.
const GENERIC_PROPS = new Set(['children', 'key', 'ref', 'id', 'testID', 'nativeID', 'className', 'style', 'platform']);

const SVG_TAGS = /^(Svg|Circle|Ellipse|G|TSpan|TextPath|Path|Polygon|Polyline|Line|Rect|Use|Symbol|Defs|LinearGradient|RadialGradient|Stop|ClipPath|Pattern|Mask)$/;

function walkCodeFiles(dir: string): string[] {
  const out: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name.startsWith('.')) continue;
      out.push(...walkCodeFiles(fullPath));
      continue;
    }
    if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) out.push(fullPath);
  }
  return out;
}

/** Scans opening JSX tags, skipping `{...}` expressions and quoted strings inside attributes. */
function scanTags(source: string): JsxTag[] {
  const tags: JsxTag[] = [];
  for (const m of source.matchAll(/<([A-Z][A-Za-z0-9]*)(?=[\s/>])/g)) {
    let i = (m.index ?? 0) + m[0].length;
    let depth = 0;
    let quote = '';
    let flat = '';
    for (; i < source.length; i += 1) {
      const ch = source[i];
      if (quote) {
        if (ch === quote) quote = '';
        continue;
      }
      if (depth > 0) {
        if (ch === '{') depth += 1;
        if (ch === '}') depth -= 1;
        if (ch === '"' || ch === "'" || ch === '`') quote = ch;
        continue;
      }
      if (ch === '{') {
        depth = 1;
        flat += ' ';
        continue;
      }
      if (ch === '"' || ch === "'") {
        quote = ch;
        flat += ' ';
        continue;
      }
      if (ch === '>') break;
      flat += ch;
    }
    const attrs = [...flat.matchAll(/(?:^|\s)([A-Za-z_][\w-]*)/g)].map((a) => a[1]);
    tags.push({ name: m[1], attrs });
  }
  return tags;
}

/** `import { Button, Box as B } from '@react-bulk/web'` -> { B: { name: 'Box', pkg: '@react-bulk/web' }, ... } */
function parseRbkImports(source: string): Map<string, { name: string; pkg: string }> {
  const map = new Map<string, { name: string; pkg: string }>();
  for (const m of source.matchAll(/import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+['"](@react-bulk\/[a-z]+)['"]/g)) {
    for (const part of m[1].split(',')) {
      const [name, local] = part.replace(/^\s*type\s+/, '').trim().split(/\s+as\s+/);
      if (name) map.set((local || name).trim(), { name: name.trim(), pkg: m[2] });
    }
  }
  return map;
}

function platformExports(pkg: string, index: RbkIndex): Set<string> | null {
  if (pkg === '@react-bulk/web') return new Set([...Object.keys(index.webComponents), ...index.webExports]);
  if (pkg === '@react-bulk/native' || pkg === '@react-bulk/expo') {
    return new Set([...Object.keys(index.nativeComponents), ...index.nativeExports]);
  }
  return null;
}

function allowedProps(index: RbkIndex): Map<string, Set<string>> {
  const names = (list: RbkDocProp[]) => list.map((prop) => prop.name);
  const box = index.docs.find((doc) => doc.symbol === 'Box');
  const shared = new Set([
    ...GENERIC_PROPS,
    ...(box ? [...names(box.props), ...names(box.events), ...names(box.styles)] : []),
    ...index.styleProps,
    ...Object.keys(index.styleAliases),
    ...Object.values(index.styleAliases),
    ...Object.keys(index.propAliases),
    ...Object.values(index.propAliases),
    ...Object.keys(index.theme.breakpoints),
  ]);
  const map = new Map<string, Set<string>>();
  for (const doc of index.docs) {
    if (doc.kind !== 'component' || !doc.symbol) continue;
    map.set(doc.symbol, new Set([...shared, ...names(doc.props), ...names(doc.events), ...names(doc.styles)]));
  }
  return map;
}

function validateSource(source: string, platform: Platform, index: RbkIndex, file?: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const components = new Set([...Object.keys(index.webComponents), ...Object.keys(index.nativeComponents)]);
  const allowed = allowedProps(index);
  const webOnly = new Map<string, Set<string>>();
  for (const doc of index.docs) {
    if (!doc.symbol) continue;
    const list = [...doc.props, ...doc.events, ...doc.styles].filter((prop) => prop.platform === 'web');
    if (list.length) webOnly.set(doc.symbol, new Set(list.map((prop) => prop.name)));
  }

  const imports = parseRbkImports(source);
  for (const { name, pkg } of imports.values()) {
    if (UNSTABLE_COMPONENTS.includes(name)) {
      issues.push({ kind: 'error', message: `${name} is not ready for use; do not use it`, file });
      continue;
    }
    const exported = platformExports(pkg, index);
    if (exported && !exported.has(name)) {
      const fromCore = index.publicExports.includes(name) || index.typeNames.includes(name);
      issues.push({
        kind: 'error',
        message: fromCore
          ? `"${name}" is not exported by ${pkg}; import it from @react-bulk/core`
          : `"${name}" is not exported by ${pkg}`,
        file,
      });
    }
    if (pkg === '@react-bulk/core' && !index.publicExports.includes(name) && !index.typeNames.includes(name)) {
      issues.push({ kind: 'error', message: `"${name}" is not a public export of @react-bulk/core`, file });
    }
  }

  // With React Bulk imports, only check tags imported from it; for bare snippets, check known component names.
  const resolve = (tag: string): string | null => {
    if (imports.size) return imports.get(tag)?.name ?? null;
    return components.has(tag) ? tag : null;
  };

  for (const tag of scanTags(source)) {
    const name = resolve(tag.name);
    if (!name || name === 'ReactBulk' || SVG_TAGS.test(name)) continue;
    const props = allowed.get(name);
    if (!props) continue;
    for (const attr of tag.attrs) {
      if (props.has(attr) || attr.startsWith('data-') || attr.startsWith('aria-')) continue;
      issues.push({ kind: 'warning', message: `Possibly invalid prop on ${name}: ${attr}`, file });
    }
    if (platform !== 'web') {
      for (const attr of tag.attrs) {
        if (webOnly.get(name)?.has(attr) || webOnly.get('Box')?.has(attr)) {
          issues.push({ kind: 'warning', message: `Prop "${attr}" on ${name} is web only`, file });
        }
      }
    }
  }

  const colors = new Set([...index.themeTokens, 'text', 'background']);
  for (const colorUsage of source.matchAll(/\b(?:color|bg|contrastColor)=["']([A-Za-z][A-Za-z0-9]*)(?:\.[A-Za-z]+)?["']/g)) {
    const token = colorUsage[1];
    if (!colors.has(token)) {
      issues.push({ kind: 'warning', message: `Unknown color token: ${token}`, file });
    }
  }
  return issues;
}

export function validateUsage(codeOrProjectPath: string, platform: Platform, index: RbkIndex) {
  const issues: ValidationIssue[] = [];
  if (existsSync(codeOrProjectPath)) {
    const stats = statSync(codeOrProjectPath);
    const files = stats.isDirectory() ? walkCodeFiles(codeOrProjectPath) : [codeOrProjectPath];
    for (const file of files) {
      issues.push(...validateSource(readFileSync(file, 'utf8'), platform, index, file));
    }
  } else {
    issues.push(...validateSource(codeOrProjectPath, platform, index));
  }

  return {
    ok: issues.filter((i) => i.kind === 'error').length === 0,
    issueCount: issues.length,
    issues,
  };
}
