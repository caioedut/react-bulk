import test from 'node:test';
import assert from 'node:assert/strict';

import { buildIndex, findDoc } from './indexer.js';
import { SPECIAL_ALIASES, STYLE_RULES } from './style-rules.js';

test('aliases used by style rules exist in the core style constants', () => {
  const index = buildIndex();
  const known = new Set([
    ...index.styleProps,
    ...Object.keys(index.aliasTable),
    ...Object.values(index.aliasTable),
    ...Object.keys(index.theme.breakpoints),
  ]);
  const box = findDoc(index, 'Box')!;
  for (const prop of [...box.props, ...box.events, ...box.styles]) known.add(prop.name);
  // Not style props, but documented Box/component props referenced by the rules.
  ['style', 'rawStyle', 'pressedStyle', 'breakpoints', 'contrastColor', 'componentProps'].forEach((name) => known.add(name));

  for (const rule of STYLE_RULES) {
    for (const name of rule.appliesTo) {
      if (name === '*') continue;
      assert.ok(known.has(name), `rule "${rule.id}" references unknown prop "${name}"`);
    }
  }
  for (const alias of Object.keys(SPECIAL_ALIASES)) {
    assert.ok(index.styleProps.includes(alias), `special alias "${alias}" is not a style prop`);
  }
});

test('alias table keeps every alias, including duplicates', () => {
  const { aliasTable } = buildIndex();
  assert.equal(aliasTable.mh, 'marginHorizontal');
  assert.equal(aliasTable.mx, 'marginHorizontal');
  assert.equal(aliasTable.pv, 'paddingVertical');
  assert.equal(aliasTable.i, 'inset');
  assert.equal(aliasTable.gx, 'columnGap');
  assert.equal(aliasTable.maxw, 'maxWidth');
  assert.equal(aliasTable.bg, 'backgroundColor');
  assert.equal(aliasTable.z, 'zIndex');
});

test('Box doc keeps free sections, value shapes and platform defaults', () => {
  const box = findDoc(buildIndex(), 'Box')!;
  const notes = box.notes.map((note) => note.title);
  assert.ok(notes.includes('Positioning & Spacing'));
  assert.ok(notes.includes('Gap'));
  assert.ok(box.notes.find((note) => note.title === 'Gap')!.content.includes('theme.shape.gap'));
  assert.ok(box.props.find((prop) => prop.name === 'hidden')?.details?.includes('xxl'));
  assert.deepEqual(box.props.find((prop) => prop.name === 'component')?.defaults, { web: "'div'", native: 'View' });
});
