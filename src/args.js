const yargs = require('yargs');

const { validateDirectory, validateExtension } = require('./validators');
const { version } = require('../package.json');

const options = {
  targetDir: {
    type: 'string',
    describe: 'Target directory with `.po` files',
    default: './dictionaries',
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

module.exports = yargs
  .options(options)
  .check(validateArgs, true)
  .version(version)
  .version(false)
  .strict()
  .help().argv;
