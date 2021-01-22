#!/usr/bin/env node
'use strict';

const { readdir } = require('fs').promises;
const { join, resolve } = require('path');

const watcher = require('./watcher');
const { isPo } = require('./validators');
const { targetDir, outDir, outExt, watch } = require('./args');
const {
  loadDictionary,
  renderDictionary,
  saveDictionary,
} = require('./dictionary');

const targetDirectory = resolve(process.cwd(), targetDir);
const outputDirectory = resolve(process.cwd(), outDir);

const handler = async (shortFilename) => {
  const filename = join(targetDirectory, shortFilename);
  const translations = loadDictionary(filename);

  Object.keys(translations).forEach((partition) => {
    const text = renderDictionary({
      partition,
      source: join(targetDir, shortFilename),
      strings: translations[partition],
    });

    saveDictionary({
      text,
      partition,
      extension: outExt,
      directory: outputDirectory,
      locale: shortFilename.split('.')[0],
    });
  });
};

(async () => {
  watcher(handler, {
    enabled: watch,
    directory: targetDirectory,
  });

  const target = await readdir(targetDirectory, { withFileTypes: true });
  const dictionaries = target.filter((dictionary) => isPo(dictionary.name));

  for (let i = 0; i < dictionaries.length; i++) {
    await handler(dictionaries[i].name);
  }
})();
