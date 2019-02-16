import _ from 'lodash';

const getSpace = depth => ' '.repeat(depth * 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const result = _.keys(value).map(key => `${getSpace(depth)}  ${key}: ${value[key]}`).join('\n');
  return `{\n${result}\n${getSpace(depth)}}`;
};

const render = (ast, depth = 0) => {
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
        return `  ${getSpace(depth)}  ${key}: ${render(children, depth + 2)}`;
      case 'added':
        return `  ${getSpace(depth)}+ ${key}: ${stringify(valueAfter, depth + 2)}`;
      case 'unchanged':
        return `  ${getSpace(depth)}  ${key}: ${stringify(valueAfter, depth + 2)}`;
      case 'changed':
        return [`  ${getSpace(depth)}+ ${key}: ${stringify(valueAfter, depth + 2)}`, `  ${getSpace(depth)}- ${key}: ${stringify(valueBefore, depth + 2)}`];
      case 'removed':
        return `  ${getSpace(depth)}- ${key}: ${stringify(valueBefore, depth + 2)}`;
      default:
        throw new Error(`Render for "${type}" is not found`);
    }
  });
  const resultToStr = _.flatten(result).join('\n');
  return `{\n${resultToStr}\n${getSpace(depth)}}`;
};
export default render;
