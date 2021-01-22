const readDir = require('./readDir');

module.exports = async (callback, { directory, checkExtension }) => {
  const dictionaries = await readDir(directory, checkExtension);

  for (let i = 0; i < dictionaries.length; i++) {
    await callback(dictionaries[i].name);
  }
};
