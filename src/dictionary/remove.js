const { join } = require('path');
const { unlink } = require('fs').promises;

module.exports = async ({ extension, directory, partition }) => {
  const filePath = join(directory, partition + extension);

  try {
    await unlink(filePath);
  } catch (e) {}
};
