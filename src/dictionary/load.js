const { po } = require('gettext-parser');
const { readFile } = require('fs').promises;

module.exports = async (filename) => {
  const file = await readFile(filename);

  try {
    return po.parse(file).translations;
  } catch (e) {
    console.error(e);
    return {};
  }
};
