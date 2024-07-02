import { join } from 'path';

import { existsSync } from 'fs';
import { writeFile, readFile, unlink } from 'fs/promises';

export const save = async (
  text: string,
  directory: string,
  partition: string,
  extension: string
) => {
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
