const fs = require('fs');
const path = require('path');

const { isPo } = require('./validators');

const lock = {};

module.exports = (callback, { enabled, directory }) => {
  if (enabled) {
    fs.watch(directory, (_event, filename) => {
      if (
        filename &&
        isPo(filename) &&
        fs.existsSync(path.join(directory, filename)) &&
        !lock[filename]
      ) {
        lock[filename] = true;
        callback(filename);

        setTimeout(() => (lock[filename] = false), 500);
      }
    });
  }
};
