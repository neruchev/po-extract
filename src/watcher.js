const { join } = require('path');
const { watch, existsSync } = require('fs');

// ignore twice calls
const lock = {};

const isAvailable = (directory, filename, checkExtension) =>
  filename &&
  !lock[filename] &&
  checkExtension(filename) &&
  existsSync(join(directory, filename));

module.exports = (callback, { isEnabled, directory, checkExtension }) => {
  if (isEnabled) {
    watch(directory, async (_event, filename) => {
      if (isAvailable(directory, filename, checkExtension)) {
        lock[filename] = true;
        await callback(filename);

        setTimeout(() => (lock[filename] = false), 500);
      }
    });
  }
};
