import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

import { RbkIndex } from './types.js';

type ValidationIssue = {
  kind: 'error' | 'warning';
  message: string;
  file?: string;
};

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

function validateSource(source: string, index: RbkIndex, file?: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const knownComponents = new Set([
    ...Object.keys(index.webComponents),
    ...Object.keys(index.nativeComponents),
    'ReactBulk',
  ]);
  const docPropMap = new Map<string, Set<string>>();
  for (const doc of index.docs) {
    if (!doc.props.length) continue;
    docPropMap.set(doc.title, new Set(doc.props.map((prop) => prop.name)));
  }
  for (const tag of source.matchAll(/<([A-Z][A-Za-z0-9]+)/g)) {
    const name = tag[1];
    if (!knownComponents.has(name)) {
      issues.push({ kind: 'warning', message: `Componente desconhecido: ${name}`, file });
    }
  }
  for (const cmp of source.matchAll(/<([A-Z][A-Za-z0-9]+)\s+([^>]+)>/g)) {
    const name = cmp[1];
    const attrs = cmp[2];
    const allowed = docPropMap.get(name);
    if (!allowed) continue;
    for (const attr of attrs.matchAll(/\s([a-zA-Z][A-Za-z0-9]*)=/g)) {
      const prop = attr[1];
      if (!allowed.has(prop) && prop !== 'children' && !prop.startsWith('data')) {
        issues.push({
          kind: 'warning',
          message: `Prop possivelmente inválida em ${name}: ${prop}`,
          file,
        });
      }
    }
  }
  for (const colorUsage of source.matchAll(/\b(?:color|bg|contrastColor)=["']([A-Za-z][A-Za-z0-9]+)["']/g)) {
    const token = colorUsage[1];
    if (!index.themeTokens.includes(token) && !['white', 'black', 'transparent'].includes(token)) {
      issues.push({ kind: 'warning', message: `Token de cor não reconhecido: ${token}`, file });
    }
  }
  return issues;
}

export function validateUsage(codeOrProjectPath: string, platform: 'web' | 'native' | 'expo', index: RbkIndex) {
  const issues: ValidationIssue[] = [];
  if (existsSync(codeOrProjectPath)) {
    const stats = statSync(codeOrProjectPath);
    if (stats.isDirectory()) {
      const files = walkCodeFiles(codeOrProjectPath);
      for (const file of files) {
        const source = readFileSync(file, 'utf8');
        issues.push(...validateSource(source, index, file));
      }
    } else {
      const source = readFileSync(codeOrProjectPath, 'utf8');
      issues.push(...validateSource(source, index, codeOrProjectPath));
    }
  } else {
    issues.push(...validateSource(codeOrProjectPath, index));
  }

  if (platform !== 'web') {
    for (const issue of issues) {
      if (issue.message.includes('href')) {
        issue.message = `${issue.message} (atenção: web-only)`;
      }
    }
  }

  return {
    ok: issues.filter((i) => i.kind === 'error').length === 0,
    issueCount: issues.length,
    issues,
  };
}
