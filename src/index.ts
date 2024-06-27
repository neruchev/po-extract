#!/usr/bin/env node
'use strict';

import { handler } from './dictionary';
import { watcher } from './tasks/watcher';
import { transformer } from './tasks/transformer';
import { isWatch, targetDirectory } from './args';

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
