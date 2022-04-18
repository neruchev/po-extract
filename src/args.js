const yargs = require('yargs');
const { resolve } = require('path');

const { validateDirectory, validateExtension } = require('./validators');
const { version } = require('../package.json');

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

const { fixPo, outDir, outExt, targetDir, watch } = yargs
  .options(options)
  .check(validateArgs, true)
  .version(version)
  .version(false)
  .strict()
  .help().argv;

module.exports = {
  isFixPo: fixPo,
  isWatch: watch,
  outExt,
  outputDirectory: resolve(process.cwd(), outDir),
  targetDir,
  targetDirectory: resolve(process.cwd(), targetDir),
};
