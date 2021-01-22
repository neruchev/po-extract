const { join } = require('path');
const { existsSync, promises } = require('fs');

const { writeFile, readFile, mkdir } = promises;

const attempts = {};

const save = async ({ text, extension, directory, partition }) => {
  const filePath = join(directory, partition + extension);

  try {
    if (existsSync(filePath)) {
      const data = await readFile(filePath);

      if (data.toString() === text) {
        return;
      }
    }

    await writeFile(filePath, text);

    console.log(`The file '${filePath}' has been saved`);
  } catch (e) {
    const counter = attempts[directory] || 0;

    if (e.code === 'ENOENT' && !existsSync(directory) && counter < 5) {
      attempts[directory] = counter + 1;

      await mkdir(directory);
      await save({ text, extension, directory, partition });
    }
  }
};

module.exports = save;
