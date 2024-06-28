#!/usr/bin/env node
'use strict';

import { handler } from 'src/dictionary';
import { watcher } from 'src/tasks/watcher';
import { transformer } from 'src/tasks/transformer';
import { isWatch, targetDirectory } from 'src/args';

const options = {
  directory: targetDirectory,
};

(async () => {
  if (isWatch) {
    watcher(handler, options);
  } else {
    await transformer(handler, options);
  }
})();
