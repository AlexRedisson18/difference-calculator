import _ from 'lodash';

const render = (ast, depth = 1) => {
  const result = ast.map((elem) => {
    const space = '  '.repeat(depth);
    const {
      key,
      type,
      valueBefore,
      valueAfter,
      children,
    } = elem;

    switch (type) {
      case 'nested':
        return `${space}  ${key}: ${render(children, depth + 2)}`;
      case 'added':
        return `${space}+ ${key}: ${valueAfter}`;
      case 'unchanged':
        return `${space}  ${key}: ${valueAfter}`;
      case 'changed':
        return [`${space}+ ${key}: ${valueAfter}`, `${space}- ${key}: ${valueBefore}`];
      case 'deleted':
        return `${space}- ${key}: ${valueBefore}`;
      default:
        return console.log('Current type is not defined');
    }
  });
  const rendered = _.flatten(result).sort((a, b) => a - b).join('\n');
  return `{\n${rendered}\n}`;
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
      + setting3: [object Object]
      - setting3: true
        setting6: {
            key: value
          + ops: vops
}
      + follow: false
      + setting4: blah blah
      + setting5: [object Object]
}
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
      + nest: str
      - nest: [object Object]
}
  - group2: [object Object]
  + group3: [object Object]
}


*/
