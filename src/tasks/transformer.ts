import { readDir } from '../utils';

export const transformer = async (
  callback: (name: string) => Promise<void>,
  { directory }: { directory: string }
) => {
  const dictionaries = await readDir(directory);

  for (let i = 0; i < dictionaries.length; i++) {
    await callback(dictionaries[i].name);
  }
};
