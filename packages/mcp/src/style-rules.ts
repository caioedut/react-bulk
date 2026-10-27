/**
 * How React Bulk turns props/styles into real styles.
 * Hand-written from `packages/core/src/libs/cometta.ts`, `themes/base.ts` and `factory/BoxFactory.tsx`;
 * `style-rules.test.ts` checks every alias mentioned here still exists in the style constants.
 */

export type StyleRule = {
  id: string;
  title: string;
  summary: string;
  /** Props (or style keys) this rule applies to. */
  appliesTo: string[];
  platform: 'web' | 'native' | 'cross';
  examples: string[];
};

export const STYLE_RULES: StyleRule[] = [
  {
    id: 'style-props',
    title: 'Style props on every component',
    summary:
      'Every component extends Box, so style props (and their aliases) can be passed directly as props, without `style`. They also work as keys inside `style`.',
    appliesTo: ['*'],
    platform: 'cross',
    examples: ['<Card p={3} bg="primary" maxw={320} />', '<Text style={{ mt: 2, fontSize: 18 }} />'],
  },
  {
    id: 'spacing',
    title: 'Positioning & spacing aliases',
    summary:
      'Prefix `m` (margin), `p` (padding) or none (position), plus side `t`/`b`/`l`/`r`, or axis `x`/`h` (horizontal) and `y`/`v` (vertical, only with m/p). `i` is inset. A number is multiplied by `theme.shape.spacing` (default 4). `true` means 1. Strings are used as-is (`"5%"`, `"16px"`, `"auto"`); `rem` also works on native.',
    appliesTo: ['i', 't', 'b', 'l', 'r', 'm', 'mt', 'mb', 'ml', 'mr', 'mh', 'mx', 'mv', 'my', 'p', 'pt', 'pb', 'pl', 'pr', 'ph', 'px', 'pv', 'py'],
    platform: 'cross',
    examples: [
      '<Box p={2} />      // padding: 8 (2 * spacing)',
      '<Box p />          // padding: 4 (true = 1)',
      '<Box mx="auto" />  // marginHorizontal: auto',
      '<Box pv="16px" />  // paddingVertical (web: paddingTop + paddingBottom)',
      '<Box p="2rem" />   // 2 * theme.typography.fontSize (also on native)',
      '<Box position="absolute" t={0} r={0} />',
    ],
  },
  {
    id: 'spacing-raw',
    title: 'Full spacing names are raw',
    summary:
      'Only the short aliases are multiplied. `margin`, `padding`, `top`, `marginTop`… with a number are plain pixels.',
    appliesTo: ['margin', 'padding', 'top', 'bottom', 'left', 'right', 'marginTop', 'paddingTop'],
    platform: 'cross',
    examples: ['<Box padding={8} /> // 8px', '<Box p={8} />       // 32px'],
  },
  {
    id: 'gap',
    title: 'Gap',
    summary:
      '`gap`, `rowGap`, `columnGap` are raw. Aliases `g` (gap), `gx` (columnGap), `gy` (rowGap) multiply a number by `theme.shape.gap * theme.shape.spacing` (default 4 * 4 = 16). `true` means 1.',
    appliesTo: ['g', 'gx', 'gy', 'gap', 'rowGap', 'columnGap'],
    platform: 'cross',
    examples: ['<Box g={1} />   // gap: 16', '<Box gap={16} /> // gap: 16', '<Box row g />   // gap: 16'],
  },
  {
    id: 'sizes',
    title: 'Size aliases',
    summary:
      '`w`/`h` (width/height), `minw`/`minh`/`maxw`/`maxh`. `ww` sets width + minWidth + maxWidth, `hh` sets height + minHeight + maxHeight. `true` on any size prop means `"100%"`. Numbers are pixels (not multiplied).',
    appliesTo: ['w', 'h', 'minw', 'minh', 'maxw', 'maxh', 'ww', 'hh', 'width', 'height', 'maxWidth', 'maxHeight'],
    platform: 'cross',
    examples: ['<Box w />        // width: 100%', '<Box ww={40} />  // fixed 40px width', '<Box maxw={320} />'],
  },
  {
    id: 'colors',
    title: 'Theme colors anywhere',
    summary:
      'Any prop/style whose name contains "color" (and `bg`) resolves theme tokens: `"primary"`, `"primary.light"` (main/light/lighter/dark/darker/contrast), `"primary.main.50"` (50% alpha), `"text.secondary"`, `"background.primary"`, common colors (`white`, `black`, `transparent`/`trans`). Raw CSS colors also work. Tokens are also resolved inside strings such as `border="1px solid secondary"`.',
    appliesTo: ['bg', 'color', 'backgroundColor', 'borderColor', 'border', 'contrastColor'],
    platform: 'cross',
    examples: ['<Box bg="primary.lighter" />', '<Text color="text.secondary" />', '<Box bg="error.main.25" />', '<Box border="2px dashed warning" />'],
  },
  {
    id: 'theme-functions',
    title: 'Style values as functions',
    summary: 'A style value can be a function receiving the theme: `(theme) => value`. Useful for `theme.color(name, alpha)` or `theme.rem(n)`.',
    appliesTo: ['*'],
    platform: 'cross',
    examples: ["<Box bg={(theme) => theme.color('primary', 0.2)} />", '<Box style={{ fontSize: (theme) => theme.rem(1.25) }} />'],
  },
  {
    id: 'border-corners-shadow',
    title: 'Border, corners and shadow',
    summary:
      '`border` accepts `true` (1px solid black), a number (width), a color token, any of width/style/color in any order (missing parts default to 1px / solid / black), or `0`/`"none"` to remove; also `borderTop`/`borderBottom`/`borderLeft`/`borderRight`. `corners` multiplies `theme.shape.borderRadius` (default 6). `shadow={n}` is an elevation: web boxShadow / native elevation + shadow*.',
    appliesTo: ['border', 'borderTop', 'borderBottom', 'borderLeft', 'borderRight', 'corners', 'shadow'],
    platform: 'cross',
    examples: ['<Box border />', '<Box border="1px solid secondary" corners={2} />', '<Card shadow={2} />'],
  },
  {
    id: 'flex',
    title: 'Flexbox shortcuts',
    summary:
      'Box is a flex container (default column). Container: `row`, `column`, `reverse`, `wrap`, `noWrap`, `center` (centers on both axes), `direction`, `alignItems`, `justifyContent`… Child: `flex` (flex: 1), `grow`, `shrink`, `basis`, `align` (alignSelf), `justify` (justifySelf), `order`. Align values accept shorthands: `start`, `end`, `between`/`space`, `around`, `evenly`, `normal` (stretch).',
    appliesTo: ['row', 'column', 'reverse', 'wrap', 'noWrap', 'center', 'direction', 'flex', 'grow', 'shrink', 'basis', 'align', 'justify', 'alignItems', 'justifyContent'],
    platform: 'cross',
    examples: ['<Box row center g={2} />', '<Box row justifyContent="between" alignItems="center" />', '<Box flex />'],
  },
  {
    id: 'responsive',
    title: 'Breakpoints',
    summary:
      'Inside `style`, keys `xs`/`sm`/`md`/`lg`/`xl`/`xxl` apply from that breakpoint up (mobile first). `hidden` accepts `true` or an object of breakpoints; there it hides ONLY within that breakpoint range. Inside `Grid`, `xs`…`xxl` props on children define column spans; on `Carousel`, they define how many items are visible. Custom keys added to `theme.breakpoints` work everywhere the built-in ones do. A component can override thresholds with the `breakpoints` prop.',
    appliesTo: ['style', 'hidden', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'breakpoints'],
    platform: 'cross',
    examples: ['<Text style={{ xs: { fontSize: 12 }, md: { fontSize: 16 } }} />', '<Box hidden={{ xs: true, sm: true }} />', '<Grid><Box xs={12} md={6} /></Grid>'],
  },
  {
    id: 'platform',
    title: 'Platform-specific props and styles',
    summary:
      '`platform={{ web, native, ios, android, "*" }}` merges props only on that platform. Inside `style`, `web: {...}` and `native: {...}` keys apply styles only on that platform.',
    appliesTo: ['platform', 'style'],
    platform: 'cross',
    examples: [
      "<Input platform={{ web: { type: 'password' }, native: { secureTextEntry: true } }} />",
      '<Box style={{ web: { cursor: "pointer" }, native: { elevation: 2 } }} />',
    ],
  },
  {
    id: 'web-css',
    title: 'Nested CSS and pseudo-classes',
    summary: 'Web only. Use `&` keys inside `style`: selectors (`"& small"`) and pseudo-classes (`"&:hover"`, `"&:focus"`, `"&:not(...)"`).',
    appliesTo: ['style'],
    platform: 'web',
    examples: ["<Box style={{ '&:hover': { bg: 'primary.lighter' }, '& small': { fontSize: 12 } }} />"],
  },
  {
    id: 'style-layers',
    title: 'style, rawStyle, pressedStyle, noRootStyles',
    summary:
      '`style` goes through the full pipeline above (on web it becomes a CSS class). `rawStyle` is inline on web and takes priority on native. `pressedStyle` applies while pressed (default `{ opacity: 0.7 }`). `noRootStyles` drops the default Box flex styles. Components with inner parts expose extra style props (e.g. Button `labelStyle`, `contentStyle`).',
    appliesTo: ['style', 'rawStyle', 'pressedStyle', 'noRootStyles'],
    platform: 'cross',
    examples: ['<Box style={{ p: 2 }} rawStyle={{ zIndex: 10 }} />'],
  },
  {
    id: 'theme-style',
    title: 'Styling non React Bulk components',
    summary:
      '`useTheme().style(...styles)` resolves aliases, theme colors, spacing and `(theme) => value` functions into a plain style object, for components outside React Bulk (e.g. a native `View`). Breakpoint keys and `&` nested CSS are not applied.',
    appliesTo: ['style'],
    platform: 'cross',
    examples: ["const theme = useTheme();\n<View style={theme.style({ bg: 'primary', p: 2, corners: 2 })} />"],
  },
  {
    id: 'rendering',
    title: 'Rendering control',
    summary:
      '`component` changes the rendered element (web default `div`, native `View`); a string tag or any component, and extra props are forwarded (`componentProps` for raw ones). `mount={false}` skips rendering, `hidden` removes it from layout, `invisible` keeps its size (opacity 0).',
    appliesTo: ['component', 'componentProps', 'mount', 'hidden', 'invisible'],
    platform: 'cross',
    examples: ['<Box component="b">Bold</Box>', '<Box component={Link} to="/home" />', '<Box mount={isOpen} />'],
  },
];

/** Aliases that are props of their own (not plain renames handled in `buildAliasTable`). */
export const SPECIAL_ALIASES: Record<string, { to: string[]; transform: string }> = {
  ww: { to: ['width', 'minWidth', 'maxWidth'], transform: 'same value on all three; true = 100%' },
  hh: { to: ['height', 'minHeight', 'maxHeight'], transform: 'same value on all three; true = 100%' },
  corners: { to: ['borderRadius'], transform: 'value * theme.shape.borderRadius' },
  shadow: { to: ['boxShadow', 'elevation'], transform: 'elevation level (web boxShadow / native elevation + shadow*)' },
};
