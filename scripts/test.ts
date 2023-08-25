import pmex from 'pmex';

const dirs = ['packages/core', 'packages/web', 'packages/native'];

for (const dir of dirs) {
  pmex(`prettier "${dir}/src/**/*.{js,jsx,ts,tsx}" --check`);

  // pmex(`eslint "${dir}/src/**/*.{js,jsx,ts,tsx}" --max-warnings=0`);

  pmex(`yarn --cwd ${dir} tsc --noEmit --skipLibCheck`);
}
