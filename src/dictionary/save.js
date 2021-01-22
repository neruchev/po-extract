const { join } = require('path');
const { existsSync, promises } = require('fs');

const { writeFile, readFile } = promises;

module.exports = async ({ text, extension, directory, partition }) => {
  const filePath = join(directory, partition + extension);

  if (existsSync(filePath)) {
    const data = await readFile(filePath);

    if (data.toString() === text) {
      return;
    }
  }

  await writeFile(filePath, text);

  console.log(`The file '${filePath}' has been saved`);
};
