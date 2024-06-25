import { join } from 'path';
import { watch, existsSync } from 'fs';

// ignore twice calls
const lock: Record<string, boolean> = {};

const isAvailable = (
  directory: string,
  filename: string,
  checkExtension: (filename: string) => boolean
) =>
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
