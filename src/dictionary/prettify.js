const { format, resolveConfig } = require('prettier');

let prettierOptions = null;

module.exports = async (text) => {
  if (!prettierOptions) {
    prettierOptions = await resolveConfig(process.cwd());
  }

  return format(text, {
    parser: 'babel',
    ...(prettierOptions || { trailingComma: 'es5', singleQuote: true }),
  });
};
