const { join } = require('path');
const { existsSync, promises } = require('fs');
const { po } = require('gettext-parser');

const {
  isFixPo,
  outExt,
  outputDirectory,
  targetDir,
  targetDirectory,
} = require('../args');
const load = require('./load');
const render = require('./render');
const remove = require('./remove');
const save = require('./save');
const readDir = require('../readDir');

const { mkdir } = promises;

const parseLocale = (filename) => filename.split('.')[0].replace(/[^\w]/g, '_');

module.exports = async (shortFilename) => {
  const locale = parseLocale(shortFilename);

  const directory = join(outputDirectory, locale);
  const filename = join(targetDirectory, shortFilename);

  const [{ translations, headers }, listing] = await Promise.all([
    load(filename),
    readDir(directory, (filename) => filename.endsWith(outExt)),
  ]);

  const partitions = Object.keys(translations);

  const commonOpts = {
    source: join(targetDir, shortFilename),
    locale,
    partitions,
  };

  const toRemove = listing
    .map((item) => item.name.split('.')[0])
    .filter((item) => !partitions.includes(item) && item !== 'index');

  const toRender = partitions.map((partition) =>
    render({ ...commonOpts, partition, strings: translations[partition] })
  );

  if (partitions.find((item) => item === '') === undefined) {
    toRender.push(render({ ...commonOpts, partition: '', strings: {} }));
  }

  const toUpdate = await Promise.all(toRender);

  const toFix = isFixPo
    ? po.compile({ headers, translations }, { sort: true }).toString() + '\n'
    : null;

  if (!existsSync(directory)) {
    await mkdir(directory);
  }

  await Promise.all([
    ...toUpdate.map(({ text, partition }) =>
      save({
        text,
        partition: partition || 'index',
        extension: outExt,
        directory,
      })
    ),
    ...toRemove.map((partition) =>
      remove({ partition, extension: outExt, directory })
    ),
    ...(toFix
      ? [
          save({
            text: toFix,
            partition: shortFilename,
            extension: '',
            directory: targetDirectory,
          }),
        ]
      : []),
  ]);
};
