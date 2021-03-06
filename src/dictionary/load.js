const { po } = require('gettext-parser');
const { readFile } = require('fs').promises;

module.exports = async (filename) => {
  const file = await readFile(filename);

  try {
    return po.parse(file).translations;
  } catch (e) {
    console.error('\x1b[31m%s\x1b[0m', `[${filename}]`, e.message);
    return {};
  }
};
