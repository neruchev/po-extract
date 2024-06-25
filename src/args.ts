import yargs from 'yargs';
import { resolve } from 'path';

import { validateDirectory, validateExtension } from './validators';
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
};

const validateArgs = ({ targetDir, outDir, outExt }) => {
  // Yargs does not support asynchronous checks
  validateDirectory(targetDir, 'targetDir');
  validateDirectory(outDir, 'outDir');

  validateExtension(outExt);

  return true;
};

export const { fixPo: isFixPo, outDir, outExt, targetDir, watch: isWatch } = yargs
  .options(options)
  .check(validateArgs, true)
  .version(version)
  .version(false)
  .strict()
  .help().argv;

export const outputDirectory = resolve(process.cwd(), outDir);
export const targetDirectory = resolve(process.cwd(), targetDir)
