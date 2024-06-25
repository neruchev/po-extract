import { join } from 'path';
import { unlink } from 'fs/promises';

export const remove = async ({ extension, directory, partition }) => {
  const filePath = join(directory, partition + extension);

  try {
    await unlink(filePath);
  } catch (e) {}
};
