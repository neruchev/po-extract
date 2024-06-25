import { readdir } from 'fs/promises';

export const readDir = async (directory, checkExtension) => {
  try {
    const listing = await readdir(directory, { withFileTypes: true });

    return listing.filter((item) => checkExtension(item.name));
  } catch (e) {
    return [];
  }
};
