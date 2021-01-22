const prettify = require('./prettify');

const isWithBreak = (partition, prev, curr) => {
  if (!prev) {
    return true;
  }

  const prevSections = prev.split('.');
  const currSections = curr.split('.');

  return (
    prevSections[0] !== currSections[0] ||
    prevSections[1] !== currSections[1] ||
    (partition !== 'events' && prevSections[2] !== currSections[2])
  );
};

const renderPartitions = (list, current) => {
  if (current !== '') {
    return { spreads: '', imports: '' };
  }

  const items = list.filter((item) => !!item);

  return {
    spreads: items.map((item) => `...${item},\n`).join(''),
    imports:
      items.map((item) => `import { ${item} } from './${item}';\n`).join('') +
      '\n',
  };
};

module.exports = async ({ locale, partition, strings, source, partitions }) => {
  const keys = Object.keys(strings);

  const renderItem = (key, i) => {
    const value = strings[key].msgstr[0];
    const withBreak = isWithBreak(partition, i ? keys[i - 1] : undefined, key);

    return `${withBreak ? '\n' : ''}'${key}': '${value}',`;
  };

  const rendered = keys.map(renderItem).join('\n');
  const { spreads, imports } = renderPartitions(partitions, partition);

  const disclaimer = `
    // THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY
    // If you want to change the content of this file, you need to edit
    // file '/${source}' and run '.po' extractor
  `;

  const name = partition || locale;

  const text = await prettify(
    `${disclaimer}\n${imports}export const ${name} = {${spreads} ${rendered}};`
  );

  return {
    text,
    partition,
  };
};
