import { Platform } from './types.js';

function pkgForPlatform(platform: Platform): string {
  if (platform === 'web') return '@react-bulk/web';
  if (platform === 'native') return '@react-bulk/native';
  return '@react-bulk/expo';
}

export function generateComponentSnippet(component: string, platform: Platform, options?: Record<string, unknown>): string {
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
  const propLines = options
    ? Object.entries(options).map(([k, v]) => ` ${k}=${typeof v === 'string' ? `"${v}"` : `{${JSON.stringify(v)}}`}`)
    : [];
  return [
    `import { ${component}, ReactBulk } from '${pkg}';`,
    '',
    'export default function Example() {',
    '  return (',
    '    <ReactBulk>',
    `      <${component}${propLines.join('')}>`,
    `        ${component}`,
    `      </${component}>`,
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
