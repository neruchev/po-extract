import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {},
  test: {
    globals: true,
    hookTimeout: 40000,
    exclude: ['node_modules', 'dist'],
  },
});
