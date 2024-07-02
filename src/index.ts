#!/usr/bin/env node
'use strict';
import { join } from 'path';
import { watch, existsSync } from 'fs';

import { handler } from 'src/dictionary';
import { isWatch, targetDirectory } from 'src/args';
import { readDir, isPo } from 'src/utils';
import { Locker } from 'src/Locker';

const locker = new Locker();

(async () => {
  if (!isWatch) {
    const dictionaries = await readDir(targetDirectory, isPo);
    await Promise.all(dictionaries.map(({ name }) => handler(name)));

    return;
  }

  watch(targetDirectory, async (_event, filename) => {
    if (
      filename &&
      !locker.isLocked(filename) &&
      isPo(filename) &&
      existsSync(join(targetDirectory, filename))
    ) {
      locker.lock(filename);
      await handler(filename);

      setTimeout(() => locker.unlock(filename), 500);
    }
  });
})();
