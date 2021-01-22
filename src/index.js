#!/usr/bin/env node
'use strict';

const handler = require('./dictionary');
const watcher = require('./watcher');
const transformer = require('./transformer');
const { isPo } = require('./validators');
const { isWatch, targetDirectory } = require('./args');

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
