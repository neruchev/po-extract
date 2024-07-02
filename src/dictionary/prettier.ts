import { format, resolveConfig, Options } from 'prettier';

let prettierOptions: Options | null = null;

export const prettify = async (text: string) => {
  if (!prettierOptions) {
    prettierOptions = await resolveConfig(process.cwd());
  }

  return format(text, {
    parser: 'babel',
    ...(prettierOptions || { trailingComma: 'es5', singleQuote: true }),
  });
};
