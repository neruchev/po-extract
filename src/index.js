#!/usr/bin/env node
'use strict';

const { readdirSync } = require('fs');
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

const handler = (shortFilename) => {
  const filename = join(targetDirectory, shortFilename);
  const translations = loadDictionary(filename);

  Object.keys(translations).forEach((partition) => {
    const text = renderDictionary({
      locale,
      partition,
      strings: translations[partition],
    });

    saveDictionary({
      locale,
      partition,
      text,
      extension: outExt,
      directory: outputDirectory,
    });
  });
};

readdirSync(targetDirectory, { withFileTypes: true })
  .filter((dictionary) => isPo(dictionary.name))
  .forEach((dictionary) => handler(dictionary.name));

watcher(handler, {
  enabled: watch,
  directory: targetDirectory,
});
