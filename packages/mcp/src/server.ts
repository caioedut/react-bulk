import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { buildIndex } from './indexer.js';
import { generateComponentSnippet, generateThemePatch } from './generation.js';
import { Platform } from './types.js';
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

export function createServer() {
  const server = new McpServer({
    name: 'react-bulk-mcp',
    version: '0.1.0',
  });
  const registerTool = server.registerTool.bind(server) as any;

  registerTool(
    'rbk_get_core_usage_guide',
    {
      description: 'Quick usage guide for Box, Text, and Scrollable.',
      inputSchema: {},
    },
    () => {
      const index = buildIndex();
      const pickDoc = (slug: string) => index.docs.find((d) => d.slug === slug);
      const box = pickDoc('core/box');
      const text = pickDoc('core/text');
      const scrollable = pickDoc('layout/scrollable') ?? pickDoc('core/scrollable');
      return asJson({
        components: [
          {
            name: 'Box',
            role: 'Foundation component. Prefer it for layout structure and Grid item wrappers.',
            doc: box?.path ?? null,
            keyProps: ['style', 'platform', 'hidden', 'invisible', 'row/column', 'xs/sm/md/lg/xl/xxl'],
          },
          {
            name: 'Text',
            role: 'Cross-platform typography component that inherits Box props.',
            doc: text?.path ?? null,
            keyProps: ['variant', 'size', 'weight', 'transform', 'color', 'numberOfLines'],
          },
          {
            name: 'Scrollable',
            role: 'Scrollable container with normalized vertical/horizontal behavior and events.',
            doc: scrollable?.path ?? null,
            keyProps: ['direction', 'contentInset', 'pagingEnabled', 'stickyHeaderIndices', 'onScroll'],
          },
        ],
        guidance: [
          'For Grid, wrap children in Box and define breakpoint props (xs/sm/md/lg/xl/xxl).',
          'Prefer style aliases for consistent token-based styling.',
          'Use platform-specific props via platform={{ web: {}, native: {} }} when needed.',
        ],
      });
    },
  );

  registerTool(
    'rbk_get_style_aliases',
    {
      description: 'Returns official style/prop aliases (e.g. maxWidth -> maxw).',
      inputSchema: {},
    },
    () => {
      const index = buildIndex();
      return asJson({
        styleAliases: index.styleAliases,
        propAliases: index.propAliases,
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
      const docs = index.docs
        .filter((doc) => {
          const target = `${doc.title} ${doc.summary} ${doc.slug} ${doc.content}`.toLowerCase();
          return target.includes(q);
        })
        .slice(0, 12)
        .map((doc) => ({
          title: doc.title,
          slug: doc.slug,
          path: doc.path,
          summary: doc.summary,
          platform: doc.content.toLowerCase().includes('web only')
            ? 'web'
            : doc.content.toLowerCase().includes('native only')
              ? 'native'
              : 'cross',
          compatibleWith: p,
        }));
      return asJson({ query, platform: p, total: docs.length, docs });
    },
  );

  registerTool(
    'rbk_get_component_api',
    {
      description: 'Return component props/events/defaults from docs.',
      inputSchema: {
        name: z.string().min(2),
        platform: z.enum(['web', 'native', 'expo']).optional(),
      },
    },
    ({ name, platform }) => {
      const index = buildIndex();
      const p = normalizePlatform(platform);
      const query = name.toLowerCase();
      const doc =
        index.docs.find((item) => item.title.toLowerCase() === query) ||
        index.docs.find((item) => item.slug.endsWith(`/${query}`));
      if (!doc) {
        return asJson({ found: false, message: `Component not found: ${name}` });
      }
      const sections = {
        props: doc.props,
        hasStylesSection: doc.sections.some((s) => s.toLowerCase() === 'styles'),
        hasEventsSection: doc.sections.some((s) => s.toLowerCase() === 'events'),
      };
      const compatibility = {
        webBinding: index.webComponents[doc.title] ?? null,
        nativeBinding: index.nativeComponents[doc.title] ?? null,
      };
      return asJson({
        found: true,
        platform: p,
        title: doc.title,
        slug: doc.slug,
        summary: doc.summary,
        sections,
        compatibility,
      });
    },
  );

  registerTool(
    'rbk_get_theme_schema',
    {
      description: 'Return the base theme schema expected by React Bulk.',
      inputSchema: {},
    },
    () => {
      const index = buildIndex();
      return asJson({
        shape: {
          borderRadius: 'number',
          spacing: 'number',
          gap: 'number',
        },
        typography: {
          fontSize: 'number',
          lineHeight: 'number',
        },
        breakpoints: {
          xs: 'number',
          sm: 'number',
          md: 'number',
          lg: 'number',
          xl: 'number',
          xxl: 'number',
        },
        colors: {
          tokens: index.themeTokens,
          nested: ['common', 'text', 'background'],
        },
        components: {
          defaultProps: 'Record<string, unknown>',
          defaultStyles: 'Record<string, unknown>',
          variants: 'Record<string, unknown>',
        },
      });
    },
  );

  registerTool(
    'rbk_generate_component_snippet',
    {
      description: 'Generate a React Bulk snippet for a component/platform.',
      inputSchema: {
        component: z.string().min(2),
        platform: z.enum(['web', 'native', 'expo']).optional(),
        options: z.record(z.unknown()).optional(),
      },
    },
    ({ component, platform, options }) => {
      const p = normalizePlatform(platform);
      const snippet = generateComponentSnippet(component, p, options as Record<string, unknown> | undefined);
      return asJson({ platform: p, component, snippet });
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
      description: 'Validate React Bulk usage in source code or a project path.',
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
      description: 'Return web/native support matrix by component.',
      inputSchema: {
        component: z.string().optional(),
      },
    },
    ({ component }) => {
      const index = buildIndex();
      if (component) {
        return asJson({
          component,
          web: index.webComponents[component] ?? null,
          native: index.nativeComponents[component] ?? null,
        });
      }
      const names = [...new Set([...Object.keys(index.webComponents), ...Object.keys(index.nativeComponents)])].sort();
      const matrix = names.map((name) => ({
        component: name,
        web: index.webComponents[name] ?? null,
        native: index.nativeComponents[name] ?? null,
      }));
      return asJson({ total: matrix.length, matrix });
    },
  );

  return server;
}
