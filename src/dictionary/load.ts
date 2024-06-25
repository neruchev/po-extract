import { po } from 'gettext-parser';
import { readFile } from 'fs/promises';

export const load = async (filename) => {
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
