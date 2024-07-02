import { join } from 'path';
import { existsSync } from 'fs';
import { mkdir, readFile } from 'fs/promises';

import {
  outExt,
  outputDirectory,
  targetDir,
  targetDirectory,
} from 'src/constants';
import { render } from 'src/dictionary/render';
import { save, remove } from 'src/dictionary/files';
import { parse, compile } from 'src/dictionary/po';
import { readDir } from 'src/utils';

const parseLocale = (filename: string) =>
  filename.split('.')[0].replace(/[^\w]/g, '_');

export const handler = async (shortFilename: string) => {
  const locale = parseLocale(shortFilename);

  const directory = join(outputDirectory, locale);
  const filename = join(targetDirectory, shortFilename);

  const [file, listing] = await Promise.all([
    readFile(filename),
    readDir(directory, (filename) => filename.endsWith(outExt)),
  ]);

  const { translations, headers } = parse(file, filename);
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
  const toFix = compile({ headers, translations });

  if (!existsSync(directory)) {
    await mkdir(directory);
  }

  await Promise.all([
    ...toUpdate.map(({ text, partition }) =>
      save(text, directory, partition || 'index', outExt)
    ),
    ...toRemove.map((partition) => remove(directory, partition, outExt)),
    ...(toFix ? [save(toFix, targetDirectory, shortFilename, '')] : []),
  ]);
};
