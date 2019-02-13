import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parser';

const getAst = (obj1, obj2) => {
  const unitedKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const ast = unitedKeys.map((key) => {
    const valueBefore = obj1[key];
    const valueAfter = obj2[key];

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
    return { key, valueBefore, type: 'deleted' };
  });

  return ast;
};


const render = (ast) => {
  const result = ast.map((elem) => {
    const space = '  ';
    const {
      key,
      type,
      valueBefore,
      valueAfter,
    } = elem;

    switch (type) {
      case 'added':
        return `${space}+ ${key}: ${valueAfter}`;
      case 'unchanged':
        return `${space}  ${key}: ${valueAfter}`;
      case 'changed':
        return [`${space}+ ${key}: ${valueAfter}`, `${space}- ${key}: ${valueBefore}`];
      default:
        return `${space}- ${key}: ${valueAfter}`;
    }
  });
  const rendered = _.flatten(result).join('\n');
  return `{\n${rendered}\n}`;
};

export default (pathToFile1, pathToFile2) => {
  const dataExtension = path.extname(pathToFile1);

  const getContent1 = fs.readFileSync(pathToFile1, 'utf-8');
  const getContent2 = fs.readFileSync(pathToFile2, 'utf-8');

  const data1 = parse[dataExtension](getContent1);
  const data2 = parse[dataExtension](getContent2);

  const ast = getAst(data1, data2);

  return render(ast);
};
