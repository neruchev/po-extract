# po-extract

A CLI tool for creating [react-intl](https://www.npmjs.com/package/react-intl)-compatible dictionaries from [gettext](https://www.gnu.org/software/gettext/) `.po`-files.

**What for?** Many translators and software translation companies prefer to work with standardized dictionaries in the `.po` format, while developers are more comfortable working with language strings in a JavaScript or TypeScript compatible format.

## Installation

Install it with yarn:

```shell
yarn add po-extract --dev
```

Or with npm:

```shell
npm install po-extract --save-dev
```

## Usage

1. Add `scripts` to `package.json`:

```diff
"scripts": {
  + "po:build": "po-extract",
  + "po:watch": "po-extract --watch",
```

2. Create `.po`-files ([example](/example/dictionaries)). By default, the library looks for the directory `dictionaries` in the root of the project, you can change it, see [CLI Options](#cli-options).

3. Create target directory. By default, the library uses the `src/dictionaries` directory in the root of the project, you can change it, see [CLI Options](#cli-options).

4. Run script to generate [react-intl](https://www.npmjs.com/package/react-intl)-compatible dictionaries:

```shell
yarn run po:build
```

Or with npm:

```shell
npm po:build
```

**See [full example](./example).**

## CLI Options

| Option        | Type    | Default              | Description                       |
| ------------- | ------- | -------------------- | --------------------------------- |
| `--targetDir` | string  | `./dictionaries`     | Target directory with `.po` files |
| `--outDir`    | string  | `./src/dictionaries` | Save output to the directory      |
| `--outExt`    | string  | `.js`                | Output files extensions           |
| `--watch`     | boolean | `false`              | Run the extractor in watch mode   |

## License

**MIT**
