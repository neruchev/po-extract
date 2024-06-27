import { join } from 'path';
import { watch, existsSync } from 'fs';

// ignore twice calls
const lock: Record<string, boolean> = {};

const isAvailable = (
  directory: string,
  filename: string | null,
  checkExtension: (filename: string) => boolean
) =>
  filename &&
  !lock[filename] &&
  checkExtension(filename) &&
  existsSync(join(directory, filename));

export const watcher = (
  callback: (name: string) => Promise<void>,
  {
    directory,
    checkExtension,
  }: {
    directory: string;
    checkExtension: (filename: string) => boolean;
  }
) => {
  watch(directory, async (_event, filename) => {
    if (isAvailable(directory, filename, checkExtension) && filename) {
      lock[filename] = true;
      await callback(filename);

      setTimeout(() => (lock[filename] = false), 500);
    }
  });
};
