#!/usr/bin/env node
'use strict';

import { handler } from './dictionary';
import { watcher } from './watcher';
import { transformer } from './transformer';
import { isPo } from './validators';
import { isWatch, targetDirectory } from './args';

const options = {
  directory: targetDirectory,
  checkExtension: isPo,
};

(async () => {
  watcher(handler, {
    ...options,
    isEnabled: isWatch,
  });

  await transformer(handler, options);
})();
