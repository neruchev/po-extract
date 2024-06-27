import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: false,
  entry: ['src/index.ts'],
  esbuildOptions(options) {
    options.external = ['prettier', 'yargs'];
  },
  esbuildPlugins: [],
  format: 'cjs',
  minify: true,
  sourcemap: false,
  treeshake: true,
});
