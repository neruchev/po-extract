#!/usr/bin/env node
'use strict';
import { join } from 'path';
import { watch, existsSync } from 'fs';

import { handler } from 'src/dictionary';
import { isWatch, targetDirectory } from 'src/args';
import { readDir, isPo } from 'src/utils';

// ignore twice calls
const lock: Record<string, boolean> = {};

const isAvailable = (directory: string, filename: string | null) =>
  filename &&
  !lock[filename] &&
  isPo(filename) &&
  existsSync(join(directory, filename));

const watcher = (callback: (name: string) => Promise<void>) => {
  watch(targetDirectory, async (_event, filename) => {
    if (isAvailable(targetDirectory, filename) && filename) {
      lock[filename] = true;
      await callback(filename);

      setTimeout(() => (lock[filename] = false), 500);
    }
  });
};

const transformer = async (callback: (name: string) => Promise<void>) => {
  const dictionaries = await readDir(targetDirectory, isPo);

  for (let i = 0; i < dictionaries.length; i++) {
    await callback(dictionaries[i].name);
  }
};

(async () => {
  if (isWatch) {
    watcher(handler);
  } else {
    await transformer(handler);
  }
})();
