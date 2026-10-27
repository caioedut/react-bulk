import test from 'node:test';
import assert from 'node:assert/strict';

import { buildIndex, findDoc } from './indexer.js';
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
  assert.ok(index.themeTokens.includes('primary'));
  assert.equal(index.theme.breakpoints.md, 768);
});

test('unstable components are not exposed', () => {
  const index = buildIndex();
  for (const name of ['GrowBox', 'Slider']) {
    assert.equal(index.webComponents[name], undefined);
    assert.equal(index.nativeComponents[name], undefined);
    assert.equal(findDoc(index, name), undefined);
    assert.ok(!index.theme.themableComponents.includes(name));
    assert.ok(!index.typeNames.includes(`${name}Props`));
    assert.ok(!index.theme.typeSource.includes(name));
  }
  const result = validateUsage("import { GrowBox } from '@react-bulk/web';", 'web', index);
  assert.equal(result.ok, false);
  assert.ok(result.issues[0].message.includes('not ready'));
});

test('findDoc resolves component names that differ from doc titles', () => {
  const index = buildIndex();
  assert.equal(findDoc(index, 'ButtonGroup')?.slug, 'forms/button-group');
  assert.equal(findDoc(index, 'InputPin')?.symbol, 'InputPin');
  assert.equal(findDoc(index, 'useTheme', 'hook')?.slug, 'hooks/use-theme');
});

test('doc props are split by section with clean types', () => {
  const button = findDoc(buildIndex(), 'Button')!;
  assert.equal(button.props.find((prop) => prop.name === 'badge')?.type, 'number | BadgeProps');
  assert.ok(button.events.some((prop) => prop.name === 'onPress'));
  assert.ok(button.styles.some((prop) => prop.name === 'labelStyle'));
  assert.ok(button.examples.length > 0);
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

test('generateComponentSnippet uses the docs example and imports what it uses', () => {
  const snippet = generateComponentSnippet('Card', 'web', undefined, buildIndex());
  assert.ok(snippet.includes('<Card'));
  assert.match(snippet, /import \{[^}]*\bCard\b[^}]*\} from '@react-bulk\/web'/);
});

test('generateComponentSnippet self-closes childless components', () => {
  assert.ok(generateComponentSnippet('Input', 'web', { label: 'Name' }).includes('<Input label="Name" />'));
});

test('generateThemePatch returns usable payload', () => {
  const patch = generateThemePatch('dark teal', 'dark');
  assert.ok(patch.includes('components'));
  assert.ok(patch.includes("primary:"));
});

test('validateUsage flags unknown token', () => {
  const index = buildIndex();
  const result = validateUsage('<Button color="banana">Ok</Button>', 'web', index);
  assert.ok(result.issues.some((issue) => issue.message.includes('banana')));
});

test('validateUsage accepts Box props, aliases and arrow handlers', () => {
  const index = buildIndex();
  const code = '<Button mt={2} bg="primary.main" xs={12} circular onPress={() => a > b}>Ok</Button>';
  assert.deepEqual(validateUsage(code, 'web', index).issues, []);
  assert.deepEqual(validateUsage('<ButtonGroup variant="outline" />', 'web', index).issues, []);
});

test('validateUsage flags invalid props and wrong imports', () => {
  const index = buildIndex();
  assert.ok(validateUsage('<Button banana>Ok</Button>', 'web', index).issues.some((i) => i.message.includes('banana')));
  const result = validateUsage("import { useBreakpoints, Box } from '@react-bulk/web';\n<MyCard foo />", 'web', index);
  assert.equal(result.ok, false);
  assert.ok(result.issues[0].message.includes('@react-bulk/core'));
  assert.equal(result.issues.length, 1);
});
