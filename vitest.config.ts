import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    coverage: {
      include: ['src/*'],
      exclude: [
        //   We exclude standard NextJS core pages as they aren't running any custom logic
        'src/pages/_app.tsx',
        'src/pages/_document.tsx',
        'src/types/*', // Types

        'src/**/repositories.ts', // data fetching/display is tested via MSW/the actual content rendering, testing the api would require a comprehensive setup
      ],
    },
    setupFiles: ['./vitest-setup.ts'],
  },
});
