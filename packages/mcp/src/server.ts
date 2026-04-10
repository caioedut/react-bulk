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
    'rbk_search_docs',
    {
      description: 'Busca docs da React Bulk por texto e plataforma.',
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
      description: 'Retorna props/eventos/defaults do componente via docs.',
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
        return asJson({ found: false, message: `Componente não encontrado: ${name}` });
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
      description: 'Retorna schema base de theme esperado pela lib.',
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
      description: 'Gera snippet React Bulk por componente/plataforma.',
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
      description: 'Gera patch de theme com base em intenção.',
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
      description: 'Valida uso da React Bulk no código ou em um path.',
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
      description: 'Matriz de suporte web/native por componente.',
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
