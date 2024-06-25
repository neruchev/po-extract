import { join } from 'path';
import { watch, existsSync } from 'fs';

// ignore twice calls
const lock = {};

const isAvailable = (directory, filename, checkExtension) =>
  filename &&
  !lock[filename] &&
  checkExtension(filename) &&
  existsSync(join(directory, filename));

export const watcher = (callback, { isEnabled, directory, checkExtension }) => {
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
