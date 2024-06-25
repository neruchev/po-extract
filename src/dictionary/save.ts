import { join } from 'path';
import { existsSync } from 'fs';
import { writeFile, readFile } from 'fs/promises';

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
