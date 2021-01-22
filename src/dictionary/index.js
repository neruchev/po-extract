const { join } = require('path');

const {
  targetDir,
  outExt,
  targetDirectory,
  outputDirectory,
} = require('../args');
const load = require('./load');
const render = require('./render');
const remove = require('./remove');
const save = require('./save');
const readDir = require('../readDir');

const parseLocale = (filename) => filename.split('.')[0].replace(/[^\w]/g, '_');

module.exports = async (shortFilename) => {
  const locale = parseLocale(shortFilename);

  const directory = join(outputDirectory, locale);
  const filename = join(targetDirectory, shortFilename);

  const [translations, listing] = await Promise.all([
    load(filename),
    readDir(directory, (filename) => filename.endsWith(outExt)),
  ]);

  const partitions = Object.keys(translations);

  const toRemove = listing
    .map((item) => item.name.split('.')[0])
    .filter((item) => !partitions.includes(item) && item !== 'index');

  const toRender = partitions.map((partition) =>
    render({
      locale,
      partition,
      source: join(targetDir, shortFilename),
      strings: translations[partition],
      allPartitions: partitions,
    })
  );

  if (partitions.find((item) => item === '') === undefined) {
    toRender.push(
      render({
        locale,
        partition: '',
        source: join(targetDir, shortFilename),
        strings: {},
        allPartitions: partitions,
      })
    );
  }

  const toUpdate = await Promise.all(toRender);

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
  ]);
};
