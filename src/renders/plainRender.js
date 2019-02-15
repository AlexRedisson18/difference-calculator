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

/*
Property 'timeout' was updated. From 50 to 20
Property 'proxy' was removed
Property 'common.setting4' was removed
Property 'common.setting5' was removed
Property 'common.setting2' was added with value: 200
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.sites' was added with value: 'hexlet.io'
Property 'group1.baz' was updated. From 'bars' to 'bas'
Property 'group3' was removed
Property 'verbose' was added with value: true
Property 'group2' was added with value: [complex value]

Property 'common.setting2 was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting6.ops' was added with value: vops
Property 'common.follow' was added with value: false
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was updated. From bas to bars
Property 'group1.nest' was updated. From [complex value] to str
Property 'group2 was removed
Property 'group3' was added with value: [complex value]

*/
