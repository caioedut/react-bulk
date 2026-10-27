import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { buildIndex, findDoc } from './indexer.js';
import { generateComponentSnippet, generateThemePatch } from './generation.js';
import { Platform, RbkDocEntry, RbkIndex } from './types.js';
import { SPECIAL_ALIASES, STYLE_RULES } from './style-rules.js';
import { validateUsage } from './validation.js';

function asJson(data: unknown): { content: Array<{ type: 'text'; text: string }> } {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

function normalizePlatform(platform?: string): Platform {
  if (platform === 'native' || platform === 'expo') return platform;
  return 'web';
}

function docPlatform(doc: RbkDocEntry): 'web' | 'native' | 'cross' {
  const content = doc.content.toLowerCase();
  if (content.includes('web only')) return 'web';
  if (content.includes('native only')) return 'native';
  return 'cross';
}

/** Content of a `## Section` (case-insensitive), up to the next `## `. */
function docSection(doc: RbkDocEntry, section: string): string | null {
  const lines = doc.content.split('\n');
  const start = lines.findIndex((line) => line.replace(/^##\s+/, '').trim().toLowerCase() === section.toLowerCase() && line.startsWith('## '));
  if (start < 0) return null;
  const end = lines.findIndex((line, i) => i > start && line.startsWith('## '));
  return lines.slice(start, end < 0 ? undefined : end).join('\n').trim();
}

function exportedFrom(index: RbkIndex, name: string): string[] {
  const packages: string[] = [];
  if (index.publicExports.includes(name) || index.typeNames.includes(name)) packages.push('@react-bulk/core');
  if (index.webComponents[name] || index.webExports.includes(name)) packages.push('@react-bulk/web');
  if (index.nativeComponents[name] || index.nativeExports.includes(name)) {
    packages.push('@react-bulk/native', '@react-bulk/expo');
  }
  return packages;
}

/** What an alias does with its value (see STYLE_RULES). */
function aliasTransform(alias: string, shape: Record<string, number>): string {
  if (['g', 'gx', 'gy'].includes(alias)) {
    return `number * theme.shape.gap * theme.shape.spacing (${shape.gap * shape.spacing}); true = 1; strings raw`;
  }
  if (/^(i|[tblr]|[mp][tblrhxvy]?)$/.test(alias)) return `number * theme.shape.spacing (${shape.spacing}); true = 1; strings raw`;
  if (['w', 'h', 'minw', 'minh', 'maxw', 'maxh'].includes(alias)) return 'raw pixels; true = 100%';
  if (alias === 'bg') return 'theme color token (primary, primary.light, primary.main.50…) or CSS color';
  if (['align', 'justify'].includes(alias)) return 'accepts start/end/center/between/around/evenly/stretch';
  return 'raw';
}

function componentNames(index: RbkIndex): string[] {
  return [...new Set([...Object.keys(index.webComponents), ...Object.keys(index.nativeComponents)])].sort();
}

export function createServer() {
  const index = buildIndex();
  const server = new McpServer({
    name: 'react-bulk-mcp',
    version: index.version,
  });
  const registerTool = server.registerTool.bind(server) as any;

  for (const doc of index.docs) {
    const uri = `rbk://docs/${doc.slug}`;
    server.registerResource(
      doc.slug,
      uri,
      { title: doc.title, description: doc.summary, mimeType: 'text/markdown' },
      () => ({ contents: [{ uri, mimeType: 'text/markdown', text: findDoc(buildIndex(), doc.slug)?.content ?? doc.content }] }),
    );
  }

  registerTool(
    'rbk_get_core_usage_guide',
    {
      description:
        'Start here. How React Bulk works: Box as the base of every component, the spacing/gap/size/color rules, responsive and platform-specific styling, and the core components.',
      inputSchema: {},
    },
    () => {
      const index = buildIndex();
      const url = (name: string) => findDoc(index, name, 'component')?.url ?? null;
      const { shape, typography, breakpoints } = index.theme;
      return asJson({
        principles: [
          'Every component extends Box: all Box props (spacing aliases, flex shortcuts, sizes, colors, style, platform, hidden…) work on Button, Card, Text, Input, etc.',
          'Prefer style props and aliases (`p={2}`, `bg="primary"`, `row center`) over raw `style` objects.',
          `Short spacing aliases multiply numbers by theme.shape.spacing (${shape.spacing}); g/gx/gy by gap * spacing (${shape.gap * shape.spacing}). Full names (padding, gap…) are raw pixels.`,
          'Color props resolve theme tokens (`primary`, `primary.light`, `primary.main.50`, `text.secondary`).',
          'Responsive: breakpoint keys inside `style` (mobile first) and `xs`…`xxl` spans on Grid children.',
          'Components come from @react-bulk/web or @react-bulk/native (expo re-exports native); most hooks and helpers only from @react-bulk/core.',
          'Wrap the app once in <ReactBulk theme={...}>.',
        ],
        themeDefaults: { shape, typography, breakpoints },
        rules: STYLE_RULES.map(({ id, title, summary, platform, examples }) => ({ id, title, summary, platform, examples })),
        components: [
          {
            name: 'Box',
            role: 'Foundation of every component: layout (flex column by default), spacing, styling and rendering control.',
            doc: url('Box'),
            keyProps: ['m/p/i + t/b/l/r/x/y', 'g/gx/gy', 'w/h/ww/hh', 'row/column/center/flex', 'bg/border/corners/shadow', 'style/rawStyle', 'platform', 'hidden/invisible/mount', 'component'],
          },
          {
            name: 'Text',
            role: 'Cross-platform typography component that inherits Box props.',
            doc: url('Text'),
            keyProps: ['variant', 'size', 'weight', 'transform', 'color', 'numberOfLines'],
          },
          {
            name: 'Grid',
            role: 'Responsive column grid; children are Box with xs/sm/md/lg/xl/xxl spans.',
            doc: url('Grid'),
            keyProps: ['size', 'gap', 'xs…xxl on children'],
          },
          {
            name: 'Scrollable',
            role: 'Scrollable container with normalized vertical/horizontal behavior and events.',
            doc: url('Scrollable'),
            keyProps: ['direction', 'contentInset', 'pagingEnabled', 'stickyHeaderIndices', 'onScroll'],
          },
        ],
        next: [
          'rbk_get_style_aliases: every alias and what it does with the value',
          'rbk_get_component_api: a component props/events/styles',
          'rbk_get_doc "layout/styles": nested CSS, pseudo-classes and the full style prop list',
        ],
      });
    },
  );

  registerTool(
    'rbk_get_style_aliases',
    {
      description:
        'Every style alias (e.g. mx -> marginHorizontal, maxw -> maxWidth) with how its value is transformed (spacing multiplier, true = 100%, theme colors…), the style rules, and every style prop accepted by Box.',
      inputSchema: {},
    },
    () => {
      const index = buildIndex();
      const { shape } = index.theme;
      const aliases: Record<string, { to: string | string[]; transform: string }> = {};
      for (const [alias, to] of Object.entries(index.aliasTable)) {
        aliases[alias] = { to, transform: aliasTransform(alias, shape) };
      }
      Object.assign(aliases, SPECIAL_ALIASES);
      return asJson({
        aliases,
        rules: STYLE_RULES,
        styleProps: index.styleProps,
        note: 'Aliases work as props (<Box mx={2} />) and as keys inside style (style={{ mx: 2 }}).',
      });
    },
  );

  registerTool(
    'rbk_search_docs',
    {
      description: 'Search React Bulk docs by text and platform.',
      inputSchema: {
        query: z.string().min(2),
        platform: z.enum(['web', 'native', 'expo']).optional(),
      },
    },
    ({ query, platform }) => {
      const index = buildIndex();
      const p = normalizePlatform(platform);
      const q = query.toLowerCase();
      const score = (doc: RbkDocEntry) => {
        let value = 0;
        if (doc.symbol?.toLowerCase() === q || doc.title.toLowerCase() === q) value += 100;
        if (doc.title.toLowerCase().includes(q)) value += 20;
        if (doc.summary.toLowerCase().includes(q)) value += 5;
        if (doc.content.toLowerCase().includes(q)) value += 1;
        return value;
      };
      const docs = index.docs
        .map((doc) => ({ doc, score: score(doc) }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 12)
        .map(({ doc }) => ({
          title: doc.title,
          slug: doc.slug,
          kind: doc.kind,
          symbol: doc.symbol,
          url: doc.url,
          summary: doc.summary,
          platform: docPlatform(doc),
          compatibleWith: p,
        }));
      return asJson({ query, platform: p, total: docs.length, docs });
    },
  );

  registerTool(
    'rbk_list_components',
    {
      description: 'List every component exported by @react-bulk/web and @react-bulk/native, with its doc (if any).',
      inputSchema: {},
    },
    () => {
      const index = buildIndex();
      const components = componentNames(index).map((name) => {
        const doc = findDoc(index, name, 'component');
        return {
          name,
          web: Boolean(index.webComponents[name]),
          native: Boolean(index.nativeComponents[name]),
          documented: Boolean(doc),
          slug: doc?.slug ?? null,
          url: doc?.url ?? null,
          themable: index.theme.themableComponents.includes(name),
        };
      });
      return asJson({
        total: components.length,
        undocumented: components.filter((item) => !item.documented).map((item) => item.name),
        components,
      });
    },
  );

  registerTool(
    'rbk_get_component_api',
    {
      description: 'Return component props/events/styles/defaults and examples from docs.',
      inputSchema: {
        name: z.string().min(2),
        platform: z.enum(['web', 'native', 'expo']).optional(),
      },
    },
    ({ name, platform }) => {
      const index = buildIndex();
      const p = normalizePlatform(platform);
      const doc = findDoc(index, name, 'component');
      const symbol = doc?.symbol ?? componentNames(index).find((item) => item.toLowerCase() === name.toLowerCase());
      if (!symbol) {
        return asJson({ found: false, message: `Component not found: ${name}`, components: componentNames(index) });
      }
      const compatibility = {
        webBinding: index.webComponents[symbol] ?? null,
        nativeBinding: index.nativeComponents[symbol] ?? null,
      };
      const propsType = `${symbol}Props`;
      if (!doc) {
        return asJson({
          found: true,
          documented: false,
          name: symbol,
          platform: p,
          compatibility,
          importFrom: exportedFrom(index, symbol).filter((pkg) => pkg !== '@react-bulk/core'),
          propsType: index.typeSources[propsType] ?? null,
          note: 'No docs page yet; props come from the TypeScript type. It also accepts every Box prop.',
        });
      }
      const filter = <T extends { platform?: string }>(list: T[]) =>
        list.filter((prop) => prop.platform === 'cross' || prop.platform === (p === 'web' ? 'web' : 'native'));
      return asJson({
        found: true,
        documented: true,
        name: symbol,
        platform: p,
        title: doc.title,
        slug: doc.slug,
        url: doc.url,
        summary: doc.summary,
        importFrom: exportedFrom(index, symbol).filter((pkg) => pkg !== '@react-bulk/core'),
        extends: symbol === 'Box' ? null : 'Box',
        ...(symbol === 'Box'
          ? { rules: STYLE_RULES }
          : {
              inherits:
                'Every Box prop also works here: spacing aliases (m/p/i/t/b/l/r, g/gx/gy), sizes (w/h/ww/hh), flex shortcuts (row/center/flex…), colors (bg, border), corners, shadow, style/rawStyle, platform, hidden/invisible/mount, component. See rbk_get_component_api("Box") or rbk_get_style_aliases.',
            }),
        notes: doc.notes,
        props: filter(doc.props),
        events: filter(doc.events),
        styles: filter(doc.styles),
        examples: doc.examples.map((example) => example.title),
        propsType: index.typeSources[propsType] ? propsType : null,
        compatibility,
      });
    },
  );

  registerTool(
    'rbk_get_doc',
    {
      description: 'Return the full markdown of a docs page (or one "## section" of it), by slug, title or exported name.',
      inputSchema: {
        name: z.string().min(2),
        section: z.string().optional(),
      },
    },
    ({ name, section }) => {
      const index = buildIndex();
      const doc = findDoc(index, name);
      if (!doc) {
        return asJson({ found: false, message: `Doc not found: ${name}`, slugs: index.docs.map((item) => item.slug) });
      }
      const content = section ? docSection(doc, section) : doc.content;
      return asJson({
        found: content !== null,
        title: doc.title,
        slug: doc.slug,
        url: doc.url,
        sections: doc.sections,
        content,
      });
    },
  );

  registerTool(
    'rbk_get_hook_api',
    {
      description: 'Return docs, import path and usage for a React Bulk hook (e.g. useTheme, useToaster).',
      inputSchema: {
        name: z.string().min(3),
      },
    },
    ({ name }) => {
      const index = buildIndex();
      const hook = index.hooks.find((item) => item.toLowerCase() === name.toLowerCase());
      if (!hook) {
        return asJson({ found: false, message: `Hook not found: ${name}`, hooks: index.hooks });
      }
      const doc = findDoc(index, hook, 'hook');
      return asJson({
        found: true,
        name: hook,
        importFrom: exportedFrom(index, hook),
        documented: Boolean(doc),
        url: doc?.url ?? null,
        content: doc?.content ?? null,
      });
    },
  );

  registerTool(
    'rbk_get_type',
    {
      description: 'Return the TypeScript definition (and docs, if any) of a public React Bulk type (e.g. RbkStyle, ButtonProps).',
      inputSchema: {
        name: z.string().min(2),
      },
    },
    ({ name }) => {
      const index = buildIndex();
      const type = index.typeNames.find((item) => item.toLowerCase() === name.toLowerCase());
      const doc = findDoc(index, name, 'type');
      if (!type && !doc) {
        const q = name.toLowerCase();
        return asJson({
          found: false,
          message: `Type not found: ${name}`,
          suggestions: index.typeNames.filter((item) => item.toLowerCase().includes(q)).slice(0, 20),
        });
      }
      return asJson({
        found: true,
        name: type ?? doc?.symbol,
        importFrom: '@react-bulk/core',
        source: type ? index.typeSources[type] : null,
        url: doc?.url ?? null,
        content: doc?.content ?? null,
      });
    },
  );

  registerTool(
    'rbk_get_theme_schema',
    {
      description: 'Return the theme schema (ThemeProps), default values and color tokens used by React Bulk.',
      inputSchema: {},
    },
    () => {
      const { theme } = buildIndex();
      return asJson({
        defaults: {
          shape: theme.shape,
          typography: theme.typography,
          breakpoints: theme.breakpoints,
        },
        colors: {
          tokens: theme.colorTokens,
          common: theme.commonColors,
          nested: ['text', 'background'],
          note: 'A string color is expanded to { main, light, lighter, dark, darker, contrast }.',
        },
        components: {
          themable: theme.themableComponents,
          shape: '{ defaultProps, defaultStyles, variants }',
        },
        typeSource: theme.typeSource,
      });
    },
  );

  registerTool(
    'rbk_generate_component_snippet',
    {
      description: 'Generate a React Bulk snippet for a component/platform (uses the docs example when no options are given).',
      inputSchema: {
        component: z.string().min(2),
        platform: z.enum(['web', 'native', 'expo']).optional(),
        options: z.record(z.unknown()).optional(),
      },
    },
    ({ component, platform, options }) => {
      const index = buildIndex();
      const p = normalizePlatform(platform);
      const name = findDoc(index, component, 'component')?.symbol ?? component;
      const snippet = generateComponentSnippet(name, p, options as Record<string, unknown> | undefined, index);
      return asJson({ platform: p, component: name, snippet });
    },
  );

  registerTool(
    'rbk_generate_theme_patch',
    {
      description: 'Generate a theme patch from a design intent.',
      inputSchema: {
        intent: z.string().min(3),
        baseMode: z.enum(['light', 'dark']).optional(),
      },
    },
    ({ intent, baseMode }) => {
      const patch = generateThemePatch(intent, (baseMode as 'light' | 'dark') || 'light');
      return asJson({ intent, baseMode: baseMode || 'light', patch });
    },
  );

  registerTool(
    'rbk_validate_usage',
    {
      description: 'Validate React Bulk usage (imports, props, color tokens) in source code or a project path.',
      inputSchema: {
        codeOrProjectPath: z.string().min(1),
        platform: z.enum(['web', 'native', 'expo']).optional(),
      },
    },
    ({ codeOrProjectPath, platform }) => {
      const index = buildIndex();
      const p = normalizePlatform(platform);
      return asJson(validateUsage(codeOrProjectPath, p, index));
    },
  );

  registerTool(
    'rbk_platform_matrix',
    {
      description: 'Return web/native support matrix by component, including platform-specific props.',
      inputSchema: {
        component: z.string().optional(),
      },
    },
    ({ component }) => {
      const index = buildIndex();
      const row = (name: string) => {
        const doc = findDoc(index, name, 'component');
        const all = doc ? [...doc.props, ...doc.events, ...doc.styles] : [];
        return {
          component: name,
          web: index.webComponents[name] ?? null,
          native: index.nativeComponents[name] ?? null,
          webOnlyProps: all.filter((prop) => prop.platform === 'web').map((prop) => prop.name),
          nativeOnlyProps: all.filter((prop) => prop.platform === 'native').map((prop) => prop.name),
        };
      };
      if (component) {
        return asJson(row(findDoc(index, component, 'component')?.symbol ?? component));
      }
      const matrix = componentNames(index).map(row);
      return asJson({ total: matrix.length, matrix });
    },
  );

  return server;
}
