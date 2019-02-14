import _ from 'lodash';

const render = (ast, depth = 1) => {
const stringify = (value, depth) => {
  if (_.isObject(value)) {
    const space = ' '.repeat(depth * 2);
    const result = _.keys(value).map(key => `${space}  ${key}: ${value[key]}`).join('\n');
    return `{\n${result}\n${space}}`;
  }
  return value;
};

const render = (ast, depth = 1) => {
  const space = ' '.repeat(depth * 2);
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
        return `${space}  ${key}: ${render(children, depth + 1)}`;
      case 'added':
        return `${space}+ ${key}: ${stringify(valueAfter, depth + 1)}`;
      case 'unchanged':
        return `${space}  ${key}: ${stringify(valueAfter, depth + 1)}`;
      case 'changed':
        return [`${space}+ ${key}: ${stringify(valueAfter, depth + 1)}`, `${space}- ${key}: ${stringify(valueBefore, depth + 1)}`];
      case 'deleted':
        return `${space}- ${key}: ${stringify(valueBefore, depth + 1)}`;
      default:
        return console.log('Current type is not defined');
    }
  });
  const resultToStr = _.flatten(result).join('\n');
  return `{\n${resultToStr}\n${space}}`;
};

export default render;

/*
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}

{
    common: {
      setting1: Value 1
    - setting2: 200
    + setting3: {
        key: value
      }
    - setting3: true
      setting6: {
        key: value
      + ops: vops
      }
    + follow: false
    + setting4: blah blah
    + setting5: {
        key5: value5
      }
    }
    group1: {
    + baz: bars
    - baz: bas
      foo: bar
    + nest: str
    - nest: {
        key: value
      }
    }
  - group2: {
      abc: 12345
    }
  + group3: {
      fee: 100500
    }
  }

*/
