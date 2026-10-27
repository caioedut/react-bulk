import { writeFileSync } from 'node:fs';

import { buildIndexFromSources, hasSources, INDEX_FILE } from './indexer.js';

if (!hasSources()) {
  console.error('[react-bulk-mcp] docs/sources not found; run this inside the react-bulk monorepo');
  process.exit(1);
}

const index = buildIndexFromSources();
writeFileSync(INDEX_FILE, JSON.stringify(index));
console.log(`[react-bulk-mcp] wrote ${INDEX_FILE} (${index.docs.length} docs)`);
