import { join } from 'path';
import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { po } from 'gettext-parser';

import {
  isFixPo,
  outExt,
  outputDirectory,
  targetDir,
  targetDirectory,
} from '../args';
import { load } from './load';
import { render } from './render';
import { remove } from './remove';
import { save } from './save';
import { readDir } from '../readDir';

const parseLocale = (filename: string) =>
  filename.split('.')[0].replace(/[^\w]/g, '_');

export const handler = async (shortFilename: string) => {
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
