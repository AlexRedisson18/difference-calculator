import _ from 'lodash';

const stringify = (ast, path = []) => {
  const elemToString = value => (_.isObject(value) ? '[complex value]' : value);

  const result = ast
    .filter(elem => elem.type !== 'unchanged')
    .map((elem) => {
      const {
        key,
        type,
        valueBefore,
        valueAfter,
        children,
      } = elem;

      switch (type) {
        case 'nested':
          return stringify(children, [...path, key]);
        case 'added':
          return `Property '${[...path, key].join('.')}' was added with value: ${elemToString(valueAfter)}`;
        case 'unchanged':
          return '';
        case 'changed':
          return `Property '${[...path, key].join('.')}' was updated. From ${elemToString(valueBefore)} to ${elemToString(valueAfter)}`;
        case 'removed':
          return `Property '${[...path, key].join('.')} was removed`;
        default:
          throw new Error(`Render for "${type}" is not found`);
      }
    });
  const resultToStr = result.join('\n');
  return resultToStr;
};

export default stringify;
