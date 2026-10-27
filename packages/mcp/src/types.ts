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
  platform?: 'web' | 'native' | 'cross';
  description?: string;
};

export type RbkDocEntry = {
  title: string;
  slug: string;
  path: string;
  category: string;
  summary: string;
  content: string;
  sections: string[];
  props: RbkDocProp[];
};

export type PlatformComponentMap = Record<string, string>;

export type RbkIndex = {
  generatedAt: string;
  docs: RbkDocEntry[];
  coreExports: RbkExportItem[];
  publicExports: string[];
  typeNames: string[];
  webComponents: PlatformComponentMap;
  nativeComponents: PlatformComponentMap;
  themeTokens: string[];
  styleAliases: Record<string, string>;
  propAliases: Record<string, string>;
};
