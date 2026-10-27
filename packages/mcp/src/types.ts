export type Platform = 'web' | 'native' | 'expo';

export type RbkExportItem = {
  name: string;
  source: string;
  internal: boolean;
};

export type RbkDocProp = {
  name: string;
  type?: string;
  defaultValue?: string;
  /** Per-platform defaults (`➤ Default Web:` / `➤ Default Native:`). */
  defaults?: Record<string, string>;
  platform?: 'web' | 'native' | 'cross';
  description?: string;
  /** Code block documenting the value shape (e.g. the `hidden` breakpoints object). */
  details?: string;
};

export type RbkDocNote = {
  title: string;
  content: string;
};

export type RbkDocExample = {
  title: string;
  code: string;
};

export type RbkDocKind = 'component' | 'hook' | 'type' | 'guide';

export type RbkDocEntry = {
  title: string;
  slug: string;
  url: string;
  category: string;
  kind: RbkDocKind;
  /** Exported name this doc describes (e.g. `ButtonGroup` for `forms/button-group`). */
  symbol: string | null;
  summary: string;
  content: string;
  sections: string[];
  props: RbkDocProp[];
  events: RbkDocProp[];
  styles: RbkDocProp[];
  /** `## Sections` with explanatory text but no individual props (e.g. Box "Positioning & Spacing"). */
  notes: RbkDocNote[];
  examples: RbkDocExample[];
};

export type PlatformComponentMap = Record<string, string>;

export type RbkThemeInfo = {
  typeSource: string;
  shape: Record<string, number>;
  typography: Record<string, number>;
  breakpoints: Record<string, number>;
  colorTokens: string[];
  commonColors: string[];
  themableComponents: string[];
};

export type RbkIndex = {
  generatedAt: string;
  version: string;
  docs: RbkDocEntry[];
  coreExports: RbkExportItem[];
  publicExports: string[];
  typeNames: string[];
  typeSources: Record<string, string>;
  webComponents: PlatformComponentMap;
  nativeComponents: PlatformComponentMap;
  /** Non-component named exports of each platform package (e.g. `useTheme`). */
  webExports: string[];
  nativeExports: string[];
  hooks: string[];
  themeTokens: string[];
  theme: RbkThemeInfo;
  styleAliases: Record<string, string>;
  propAliases: Record<string, string>;
  /** Every short alias -> full style prop (`mh` and `mx` -> `marginHorizontal`). */
  aliasTable: Record<string, string>;
  /** Every style-like prop accepted by Box (and so by every component that extends it). */
  styleProps: string[];
};
