import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

import { RbkDocEntry, RbkDocProp, RbkExportItem, RbkIndex } from './types.js';

const DOCS_ROOT = path.resolve(process.cwd(), '../../docs/docs');
const CORE_INDEX_PATH = path.resolve(process.cwd(), '../../packages/core/src/index.ts');
const CORE_TYPES_PATH = path.resolve(process.cwd(), '../../packages/core/src/types.ts');
const WEB_INDEX_PATH = path.resolve(process.cwd(), '../../packages/web/src/index.ts');
const NATIVE_INDEX_PATH = path.resolve(process.cwd(), '../../packages/native/src/index.ts');

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

function extractProps(content: string): RbkDocProp[] {
  const props: RbkDocProp[] = [];
  const propHeader = /### \*\*`([^`]+)`\*\*/g;
  const matches = [...content.matchAll(propHeader)];
  for (let i = 0; i < matches.length; i += 1) {
    const current = matches[i];
    const next = matches[i + 1];
    const start = current.index ?? 0;
    const end = next?.index ?? content.length;
    const block = content.slice(start, end);
    const name = current[1];
    const typeMatch = block.match(/➤ Type:\s+\*\*`?([^*\n]+)`?\*\*/);
    const defaultMatch = block.match(/➤ Default:\s+\*\*`?([^*\n]+)`?\*\*/);
    let platform: 'web' | 'native' | 'cross' = 'cross';
    if (/web only/i.test(block)) platform = 'web';
    if (/native only/i.test(block)) platform = 'native';
    const descLine = block
      .split('\n')
      .slice(1, 6)
      .map((line) => line.trim())
      .find((line) => line && !line.startsWith('➤') && !line.startsWith('---'));
    props.push({
      name,
      type: typeMatch?.[1]?.trim(),
      defaultValue: defaultMatch?.[1]?.trim(),
      platform,
      description: descLine,
    });
  }
  return props;
}

function summarize(content: string): string {
  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#') && !line.startsWith('---'));
  return (lines[0] || '').slice(0, 240);
}

function parseDoc(filePath: string): RbkDocEntry {
  const content = readFileSync(filePath, 'utf8');
  const title = content.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? path.basename(filePath, '.md');
  const sections = [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
  const rel = path.relative(DOCS_ROOT, filePath).replace(/\\/g, '/');
  const slug = rel.replace(/\.md$/, '');
  const category = rel.split('/')[0] ?? 'misc';
  return {
    title,
    slug,
    path: filePath,
    category,
    summary: summarize(content),
    content,
    sections,
    props: extractProps(content),
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

function parseTypeNames(filePath: string): string[] {
  const content = readFileSync(filePath, 'utf8');
  const names = new Set<string>();
  for (const m of content.matchAll(/export\s+(?:type|interface)\s+([A-Za-z0-9_]+)/g)) {
    names.add(m[1]);
  }
  return [...names].sort();
}

function parsePlatformComponents(filePath: string): Record<string, string> {
  const content = readFileSync(filePath, 'utf8');
  const map: Record<string, string> = {};
  for (const m of content.matchAll(/export const ([A-Za-z0-9_]+) = ([A-Za-z0-9_]+)/g)) {
    map[m[1]] = m[2];
  }
  return map;
}

function extractThemeTokens(docs: RbkDocEntry[]): string[] {
  const tokenSet = new Set<string>(['primary', 'secondary', 'info', 'success', 'warning', 'error']);
  const themeDoc = docs.find((doc) => doc.slug === 'layout/theme');
  if (!themeDoc) return [...tokenSet];
  for (const m of themeDoc.content.matchAll(/^\s{4}([a-zA-Z][A-Za-z0-9]+):\s*['"#]/gm)) {
    tokenSet.add(m[1]);
  }
  return [...tokenSet].sort();
}

let cached: { key: number; index: RbkIndex } | null = null;

function computeKey(): number {
  const files = [CORE_INDEX_PATH, CORE_TYPES_PATH, WEB_INDEX_PATH, NATIVE_INDEX_PATH, ...walkFiles(DOCS_ROOT, '.md')];
  return files.reduce((acc, file) => acc + statSync(file).mtimeMs, 0);
}

export function buildIndex(): RbkIndex {
  const key = computeKey();
  if (cached && cached.key === key) return cached.index;
  const docFiles = walkFiles(DOCS_ROOT, '.md');
  const docs = docFiles.map(parseDoc);
  const coreExports = parseCoreExports(CORE_INDEX_PATH);
  const publicExports = coreExports.filter((item) => !item.internal).map((item) => item.name);
  const typeNames = parseTypeNames(CORE_TYPES_PATH);
  const webComponents = parsePlatformComponents(WEB_INDEX_PATH);
  const nativeComponents = parsePlatformComponents(NATIVE_INDEX_PATH);
  const themeTokens = extractThemeTokens(docs);
  const index: RbkIndex = {
    generatedAt: new Date().toISOString(),
    docs,
    coreExports,
    publicExports,
    typeNames,
    webComponents,
    nativeComponents,
    themeTokens,
  };
  cached = { key, index };
  return index;
}
