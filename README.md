# po-extract

Creating [react-intl](https://www.npmjs.com/package/react-intl)-compatible dictionaries from `.po`-files.

## Installation

Install it with yarn:

```shell
yarn add po-extract --dev
```

Or with npm:

```shell
npm install po-extract --save-dev
```

## CLI Options

| Option      | Type        | Default              | Description                        |
|-------------|-------------|----------------------|--------------------------- --------|
| --targetDir | string      | `./dictionaries`     | Target directory with `.po` files  |
| --outDir    | string      | `./src/dictionaries` | Save output to the directory       |
| --outExt    | `.js`/`.ts` | `.ts`                | Output files extensions            |
| --watch     |             |                      | Run the extractor in watch mode    |

## License

**MIT**
