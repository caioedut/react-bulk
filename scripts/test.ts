import { execSync } from 'child_process';

const dirs = ['packages/core', 'packages/web', 'packages/native', 'examples/web', 'examples/native'];

for (const dir of dirs) {
  const commands = [
    // Run sequence
    `npx prettier --check "${dir}/{src,test,app,pages}/**/*.{js,jsx,ts,tsx}"`,
    // `yarn --cwd ${dir} eslint "{src,test}/**/*.{js,jsx,ts,tsx}"`,
    `yarn --cwd ${dir} tsc --noEmit --skipLibCheck`,
  ];

  for (const cmd of commands) {
    console.log('-'.repeat(process.stdout.columns));
    console.log(`$ ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
    console.log('Finished.');
  }
}
