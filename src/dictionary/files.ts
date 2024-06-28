import { join } from 'path';
import { po } from 'gettext-parser';
import { existsSync } from 'fs';
import { writeFile, readFile, unlink } from 'fs/promises';

export const load = async (filename: string) => {
  const file = await readFile(filename);

  try {
    const { translations, headers } = po.parse(file);

    if (translations && translations[''] && translations['']['']) {
      delete translations[''][''];
    }

    return { translations, headers };
  } catch (e) {
    console.error('\x1b[31m%s\x1b[0m', `[${filename}]`, e.message);
    return { translations: {}, headers: {} };
  }
};

export const save = async ({
  text,
  extension,
  directory,
  partition,
}: {
  text: string;
  extension: string;
  directory: string;
  partition: string;
}) => {
  const filePath = join(directory, partition + extension);

  if (existsSync(filePath)) {
    const data = await readFile(filePath);

    if (data.toString() === text) {
      return;
    }
  }

  await writeFile(filePath, text);

  console.log(`The file '${filePath}' has been saved`);
};

export const remove = async (
  directory: string,
  partition: string,
  extension: string
) => {
  const filePath = join(directory, partition + extension);

  try {
    await unlink(filePath);
  } catch (e) {}
};
