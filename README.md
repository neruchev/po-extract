# po-extract

A CLI tool for creating [react-intl](https://www.npmjs.com/package/react-intl)-compatible dictionaries from `.po`-files.

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

See [example](./example).

## CLI Options

| Option        | Type    | Default              | Description                       |
| ------------- | ------- | -------------------- | --------------------------------- |
| `--targetDir` | string  | `./dictionaries`     | Target directory with `.po` files |
| `--outDir`    | string  | `./src/dictionaries` | Save output to the directory      |
| `--outExt`    | string  | `.js`                | Output files extensions           |
| `--watch`     | boolean | `false`              | Run the extractor in watch mode   |

## License

**MIT**
