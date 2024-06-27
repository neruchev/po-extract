import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'cjs',
  dts: true,
  sourcemap: true,
  clean: true,
  esbuildOptions(options) {
    options.external = ['prettier'];
  },
  esbuildPlugins: [],
});
