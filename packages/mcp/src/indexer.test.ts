import test from 'node:test';
import assert from 'node:assert/strict';

import { buildIndex } from './indexer.js';
import { generateComponentSnippet, generateThemePatch } from './generation.js';
import { validateUsage } from './validation.js';

test('buildIndex returns docs and exports', () => {
  const index = buildIndex();
  assert.ok(index.docs.length > 0);
  assert.ok(index.publicExports.includes('ReactBulk'));
  assert.ok(Object.keys(index.webComponents).includes('Button'));
  assert.ok(Object.keys(index.nativeComponents).includes('Button'));
  assert.equal(index.styleAliases.maxWidth, 'maxw');
  assert.equal(index.propAliases.marginTop, 'mt');
});

test('generateComponentSnippet targets platform package', () => {
  const snippet = generateComponentSnippet('Button', 'native');
  assert.ok(snippet.includes("@react-bulk/native"));
  assert.ok(snippet.includes('<Button'));
});

test('generateComponentSnippet for Grid includes Box children and breakpoints', () => {
  const snippet = generateComponentSnippet('Grid', 'web');
  assert.ok(snippet.includes('<Grid size={12} gap={2}>'));
  assert.ok(snippet.includes('<Box xs={12} sm={6} md={4} lg={3}'));
  assert.ok(snippet.includes('xs=12 sm=6 md=4 lg=3'));
});

test('generateThemePatch returns usable payload', () => {
  const patch = generateThemePatch('dark teal', 'dark');
  assert.ok(patch.includes('components'));
  assert.ok(patch.includes("primary:"));
});

test('validateUsage flags unknown token', () => {
  const index = buildIndex();
  const result = validateUsage('<Button color="banana">Ok</Button>', 'web', index);
  assert.ok(result.issueCount >= 1);
});
