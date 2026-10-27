import { Platform, RbkIndex } from './types.js';

// Components that render no children.
const SELF_CLOSING = new Set(['Divider', 'Image', 'Input', 'InputDate', 'InputPin', 'Loading', 'Progress', 'Checkbox', 'Switch', 'Select']);

const REACT_HOOKS = ['useState', 'useEffect', 'useRef', 'useMemo', 'useCallback', 'useReducer', 'useContext'];

function pkgForPlatform(platform: Platform): string {
  if (platform === 'web') return '@react-bulk/web';
  if (platform === 'native') return '@react-bulk/native';
  return '@react-bulk/expo';
}

/** Turns a docs `jsx live` example into a standalone module with the imports it needs. */
function snippetFromExample(code: string, platform: Platform, index: RbkIndex): string {
  const pkg = pkgForPlatform(platform);
  const platformExports = new Set([
    ...Object.keys(platform === 'web' ? index.webComponents : index.nativeComponents),
    ...(platform === 'web' ? index.webExports : index.nativeExports),
  ]);
  const rbk = new Set<string>(['ReactBulk']);
  const core = new Set<string>();
  const react = new Set<string>();
  for (const m of code.matchAll(/<([A-Z][A-Za-z0-9]*)/g)) {
    if (platformExports.has(m[1])) rbk.add(m[1]);
  }
  for (const m of code.matchAll(/\b(use[A-Z][A-Za-z0-9]*)\(/g)) {
    if (REACT_HOOKS.includes(m[1])) react.add(m[1]);
    else if (platformExports.has(m[1])) rbk.add(m[1]);
    else if (index.publicExports.includes(m[1])) core.add(m[1]);
  }
  const lines: string[] = [];
  if (react.size) lines.push(`import { ${[...react].sort().join(', ')} } from 'react';`);
  if (core.size) lines.push(`import { ${[...core].sort().join(', ')} } from '@react-bulk/core';`);
  lines.push(`import { ${[...rbk].sort().join(', ')} } from '${pkg}';`, '');
  const fn = code.match(/^\s*function\s+([A-Za-z0-9_]+)\s*\(/);
  if (fn) {
    lines.push(code.replace(/^\s*function\s+[A-Za-z0-9_]+\s*\(/, 'function Example('), '');
    lines.push('export default function App() {', '  return (', '    <ReactBulk>', '      <Example />', '    </ReactBulk>', '  );', '}');
    return lines.join('\n');
  }
  const body = code
    .split('\n')
    .map((line) => `      ${line}`)
    .join('\n');
  lines.push('export default function Example() {', '  return (', '    <ReactBulk>', body, '    </ReactBulk>', '  );', '}');
  return lines.join('\n');
}

export function generateComponentSnippet(
  component: string,
  platform: Platform,
  options?: Record<string, unknown>,
  index?: RbkIndex,
): string {
  const pkg = pkgForPlatform(platform);
  if (component === 'Button') {
    return [
      `import { Button, ReactBulk } from '${pkg}';`,
      '',
      'export default function Example() {',
      '  return (',
      '    <ReactBulk>',
      "      <Button color=\"primary\" variant=\"solid\" onPress={() => console.log('pressed')}>",
      "        Click me",
      '      </Button>',
      '    </ReactBulk>',
      '  );',
      '}',
    ].join('\n');
  }
  if (component === 'Grid') {
    return [
      `import { Box, Grid, ReactBulk, Text } from '${pkg}';`,
      '',
      'export default function ExampleGrid() {',
      '  return (',
      '    <ReactBulk>',
      '      <Grid size={12} gap={2}>',
      '        <Box xs={12} sm={6} md={4} lg={3} bg="primary" p={3}>',
      '          <Text color="white">Item A (xs=12 sm=6 md=4 lg=3)</Text>',
      '        </Box>',
      '        <Box xs={12} sm={6} md={4} lg={3} bg="secondary" p={3}>',
      '          <Text color="white">Item B (xs=12 sm=6 md=4 lg=3)</Text>',
      '        </Box>',
      '        <Box xs={12} sm={12} md={4} lg={6} bg="info" p={3}>',
      '          <Text color="white">Item C (xs=12 sm=12 md=4 lg=6)</Text>',
      '        </Box>',
      '      </Grid>',
      '    </ReactBulk>',
      '  );',
      '}',
    ].join('\n');
  }
  const example = index?.docs.find((doc) => doc.symbol === component)?.examples[0];
  if (example && !options) {
    return snippetFromExample(example.code, platform, index!);
  }
  const propLines = options
    ? Object.entries(options).map(([k, v]) => ` ${k}=${typeof v === 'string' ? `"${v}"` : `{${JSON.stringify(v)}}`}`)
    : [];
  return [
    `import { ${component}, ReactBulk } from '${pkg}';`,
    '',
    'export default function Example() {',
    '  return (',
    '    <ReactBulk>',
    ...(SELF_CLOSING.has(component)
      ? [`      <${component}${propLines.join('')} />`]
      : [`      <${component}${propLines.join('')}>`, `        ${component}`, `      </${component}>`]),
    '    </ReactBulk>',
    '  );',
    '}',
  ].join('\n');
}

export function generateThemePatch(intent: string, baseMode: 'light' | 'dark' = 'light'): string {
  const normalized = intent.toLowerCase();
  const primary = normalized.includes('green') ? '#22C55E' : normalized.includes('orange') ? '#F97316' : '#8B5CF6';
  const accent = normalized.includes('teal') ? '#14B8A6' : '#0EA5E9';
  const bg = baseMode === 'dark' ? '#0B1020' : '#FFFFFF';
  const text = baseMode === 'dark' ? '#E5E7EB' : '#232323';
  return [
    'export default {',
    '  shape: { borderRadius: 8, spacing: 4, gap: 4 },',
    '  colors: {',
    `    primary: '${primary}',`,
    `    secondary: '${accent}',`,
    "    success: '#22C55E',",
    "    warning: '#F59E0B',",
    "    error: '#EF4444',",
    '    background: {',
    `      primary: '${bg}',`,
    "      secondary: '#F3F4F6',",
    "      disabled: '#6B7280',",
    '    },',
    '    text: {',
    `      primary: '${text}',`,
    "      secondary: '#6B7280',",
    "      disabled: '#9CA3AF',",
    '    },',
    '  },',
    '  components: {',
    '    Button: {',
    '      defaultProps: {',
    "        color: 'primary',",
    "        variant: 'solid',",
    '      },',
    '    },',
    '  },',
    '};',
  ].join('\n');
}
