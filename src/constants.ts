import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { resolve } from 'path';

import { validateDirectory, validateExtension } from 'src/utils';

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

const args = yargs(hideBin(process.argv))
  .options(options)
  .check(({ targetDir, outDir, outExt }) => {
    validateDirectory(targetDir, 'targetDir');
    validateDirectory(outDir, 'outDir');
    validateExtension(outExt);

    return true;
  }, true)
  .version()
  .strict()
  .help()
  .parseSync();

export const outputDirectory = resolve(process.cwd(), args.outDir);
export const targetDirectory = resolve(process.cwd(), args.targetDir);

export const { fixPo: isFixPo, outExt, watch: isWatch, targetDir } = args;
