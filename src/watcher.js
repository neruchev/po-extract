const { join } = require('path');
const { watch, existsSync } = require('fs');

const { isPo } = require('./validators');

const lock = {};

module.exports = (callback, { enabled, directory }) => {
  if (enabled) {
    watch(directory, (_event, filename) => {
      if (
        filename &&
        isPo(filename) &&
        existsSync(join(directory, filename)) &&
        !lock[filename]
      ) {
        lock[filename] = true;
        callback(filename);

        setTimeout(() => (lock[filename] = false), 500);
      }
    });
  }
};
