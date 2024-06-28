import { join } from 'path';
import { watch, existsSync } from 'fs';

import { isPo } from 'src/utils';

// ignore twice calls
const lock: Record<string, boolean> = {};

const isAvailable = (directory: string, filename: string | null) =>
  filename &&
  !lock[filename] &&
  isPo(filename) &&
  existsSync(join(directory, filename));

export const watcher = (
  callback: (name: string) => Promise<void>,
  { directory }: { directory: string }
) => {
  watch(directory, async (_event, filename) => {
    if (isAvailable(directory, filename) && filename) {
      lock[filename] = true;
      await callback(filename);

      setTimeout(() => (lock[filename] = false), 500);
    }
  });
};
