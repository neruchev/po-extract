import yargs from 'yargs/yargs';
import { resolve } from 'path';

import { validateDirectory, validateExtension } from 'src/utils';
import { version } from '../package.json';

const options = {
  fixPo: {
    type: 'boolean',
    describe: 'Fix translations order in `.po` files',
    default: false,
  },
  outDir: {
    type: 'string',
    describe: 'Save output to the directory',
    default: './src/dictionaries',
  },
  outExt: {
    type: 'string',
    describe: 'Output files extensions',
    default: '.js',
  },
  targetDir: {
    type: 'string',
    describe: 'Target directory with `.po` files',
    default: './dictionaries',
  },
  watch: {
    type: 'boolean',
    describe: 'Run the extractor in watch mode',
    default: false,
  },
} as const;

export const {
  fixPo: isFixPo,
  outDir,
  outExt,
  targetDir,
  watch: isWatch,
} = yargs(process.argv.slice(2))
  .options(options)
  .check(({ targetDir, outDir, outExt }) => {
    validateDirectory(targetDir, 'targetDir');
    validateDirectory(outDir, 'outDir');

    validateExtension(outExt);

    return true;
  }, true)
  .version(version)
  .version(false)
  .strict()
  .help()
  .parseSync();

export const outputDirectory = resolve(process.cwd(), outDir);
export const targetDirectory = resolve(process.cwd(), targetDir);
