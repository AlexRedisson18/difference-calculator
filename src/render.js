import _ from 'lodash';

const stringify = (ast, depth = 0) => {
  const space = ' '.repeat(depth * 2);

  const valueToString = (value, currentDepth) => {
    const newSpace = ' '.repeat(currentDepth * 2);
    if (_.isObject(value)) {
      const result = _.keys(value).map(key => `${newSpace}  ${key}: ${value[key]}`).join('\n');
      return `{\n${result}\n${newSpace}}`;
    }
    return value;
  };

  const result = ast.map((elem) => {
    const {
      key,
      type,
      valueBefore,
      valueAfter,
      children,
    } = elem;

    switch (type) {
      case 'nested':
        return `  ${space}  ${key}: ${stringify(children, depth + 2)}`;
      case 'added':
        return `  ${space}+ ${key}: ${valueToString(valueAfter, depth + 2)}`;
      case 'unchanged':
        return `  ${space}  ${key}: ${valueToString(valueAfter, depth + 2)}`;
      case 'changed':
        return [`  ${space}+ ${key}: ${valueToString(valueAfter, depth + 2)}`, `  ${space}- ${key}: ${valueToString(valueBefore, depth + 2)}`];
      case 'deleted':
        return `  ${space}- ${key}: ${valueToString(valueBefore, depth + 2)}`;
      default:
        return console.log('Type is not defined');
    }
  });

  const resultToStr = _.flatten(result).join('\n');

  return `{\n${resultToStr}\n${space}}`;
};

export default stringify;
