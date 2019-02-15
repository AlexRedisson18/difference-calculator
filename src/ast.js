import _ from 'lodash';

const makeAst = (obj1, obj2) => {
  const unitedKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const ast = unitedKeys.map((key) => {
    const valueBefore = obj1[key];
    const valueAfter = obj2[key];

    if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
      return { key, type: 'nested', children: makeAst(valueBefore, valueAfter) };
    }


    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (valueBefore === valueAfter) {
        return { key, valueAfter, type: 'unchanged' };
      }
      return {
        key, valueBefore, valueAfter, type: 'changed',
      };
    }

    if (!_.has(obj1, key)) {
      return { key, valueAfter, type: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, valueBefore, type: 'deleted' };
    }
    throw new Error(`Failed to find ${key} in ${obj1}, ${obj2}`);
  });

  return ast;
};

export default makeAst;
