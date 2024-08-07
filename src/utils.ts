import { resolve } from 'path';
import { accessSync, lstatSync, constants } from 'fs';

export const isPo = (filename: string) => filename.endsWith('.po');

export const validateExtension = (extension: string) => {
  const parts = extension.split('.');

  if (parts[0] || !/^[a-zA-Z]*$/.test(parts[1])) {
    throw new Error(`Invalid extension: '${extension}'`);
  }
};

export const validateDirectory = (dir: string, name: string) => {
  const directory = resolve(process.cwd(), dir);

  try {
    accessSync(directory, constants.R_OK);
  } catch (e) {
    throw new Error(
      `Can't resolve the ${name}: '${directory}'.
      Directory does not exist or you do not have access rights`
    );
  }

  if (!lstatSync(directory).isDirectory()) {
    throw new Error(
      `Can't resolve the ${name}: '${directory}'.
      The specified path exists but is not a directory`
    );
  }
};
