import { po, GetTextTranslations } from 'gettext-parser';

import { isFixPo } from 'src/constants';

export const parse = (
  file: Buffer,
  name: string
): Omit<GetTextTranslations, 'charset'> => {
  try {
    const { translations, headers } = po.parse(file);

    if (translations && translations[''] && translations['']['']) {
      delete translations[''][''];
    }

    return { translations, headers };
  } catch (e) {
    console.error('\x1b[31m%s\x1b[0m', `[${name}]`, e.message);
    return { translations: {}, headers: {} };
  }
};

export const compile = (options: Omit<GetTextTranslations, 'charset'>) =>
  isFixPo
    ? po.compile({ ...options, charset: 'utf-8' }, { sort: true }).toString() +
      '\n'
    : null;
