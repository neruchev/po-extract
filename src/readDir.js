const { readdir } = require('fs').promises;

module.exports = async (directory, checkExtension) => {
  try {
    const listing = await readdir(directory, { withFileTypes: true });

    return listing.filter((item) => checkExtension(item.name));
  } catch (e) {
    return [];
  }
};
