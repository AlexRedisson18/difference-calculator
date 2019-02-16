import _ from 'lodash';

const stringify = value => (_.isObject(value) ? '[complex value]' : value);

const render = (ast, path = []) => {
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
          return render(children, [...path, key]);
        case 'added':
        // Дублирование чего? функция выдает или [complex value] или то же valueAfter
        // Property 'common.setting5' was added with value: [complex value]
        // Property 'common.setting6.ops' was added with value: vops
          return `Property '${[...path, key].join('.')}' was added with value: ${stringify(valueAfter)}`;
        case 'unchanged':
          return '';
        case 'changed':
          return `Property '${[...path, key].join('.')}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`;
        case 'removed':
          return `Property '${[...path, key].join('.')}' was removed`;
        default:
          throw new Error(`Render for "${type}" is not found`);
      }
    });
  const resultToStr = result.join('\n');
  return resultToStr;
};

export default render;
