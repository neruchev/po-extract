import { format, resolveConfig } from 'prettier';

let prettierOptions = null;

export const prettify = async (text) => {
  if (!prettierOptions) {
    prettierOptions = await resolveConfig(process.cwd());
  }

  return format(text, {
    parser: 'babel',
    ...(prettierOptions || { trailingComma: 'es5', singleQuote: true }),
  });
};
