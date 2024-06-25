import { join } from 'path';
import { unlink } from 'fs/promises';

export const remove = async ({
  extension,
  directory,
  partition,
}: {
  extension: string;
  directory: string;
  partition: string;
}) => {
  const filePath = join(directory, partition + extension);

  try {
    await unlink(filePath);
  } catch (e) {}
};
