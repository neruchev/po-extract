import { readDir } from './readDir';

export const transformer = async (
  callback: (name: string) => Promise<void>,
  {
    directory,
    checkExtension,
  }: { directory: string; checkExtension: (filename: string) => boolean }
) => {
  const dictionaries = await readDir(directory, checkExtension);

  for (let i = 0; i < dictionaries.length; i++) {
    await callback(dictionaries[i].name);
  }
};
