const { join } = require('path');
const { watch, existsSync } = require('fs');

const { isPo } = require('./validators');

// ignore twice calls
const lock = {};

const isAvailable = (directory, filename) =>
  filename &&
  !lock[filename] &&
  isPo(filename) &&
  existsSync(join(directory, filename));

module.exports = (callback, { enabled, directory }) => {
  if (enabled) {
    watch(directory, async (_event, filename) => {
      if (isAvailable(directory, filename)) {
        lock[filename] = true;
        await callback(filename);

        setTimeout(() => (lock[filename] = false), 500);
      }
    });
  }
};
