const { resolve } = require('path');
const { accessSync, lstatSync, constants } = require('fs');

const validateExtension = (ext) => {
  const parts = ext.split('.');

  if (parts[0] || !/^[a-zA-Z]*$/.test(parts[1])) {
    throw new Error(`Invalid extension: '${ext}'`);
  }
};

const validateDirectory = (dir, name) => {
  const directory = resolve(process.cwd(), dir);

  try {
    accessSync(directory, constants.R_OK);
  } catch (e) {
    throw new Error(
      `Can't resolve the ${name}: '${directory}'.
      Directory does not exist or you do not have access rights`
    );
  }

  if (!lstatSync(directory).isDirectory()) {
    throw new Error(
      `Can't resolve the ${name}: '${directory}'.
      The specified path exists but is not a directory`
    );
  }
};

const isPo = (filename) => filename.endsWith('.po');

module.exports = {
  validateExtension,
  validateDirectory,
  isPo,
};
