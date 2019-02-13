import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parser';

const getAst = (oldObj, newObj) => {
  const unitedKeys = _.union(Object.keys(oldObj), Object.keys(newObj));
  const ast = unitedKeys.map((key) => {
    const oldValue = oldObj[key];
    const newValue = newObj[key];

    if (_.has(oldObj, key) && _.has(newObj, key)) {
      if (oldValue === newValue) {
        return { key, newValue, type: 'unchanged' };
      }
      return {
        key, oldValue, newValue, type: 'changed',
      };
    }
    if (!_.has(oldObj, key)) {
      return { key, newValue, type: 'added' };
    }
    return { key, oldValue, type: 'deleted' };
  });

  return ast;
};


const astToString = (ast) => {
  const result = ast.map((elem) => {
    const space = '  ';
    const {
      key,
      type,
      oldValue,
      newValue,
    } = elem;

    switch (type) {
      case 'added':
        return `${space}+ ${key}: ${newValue}`;
      case 'unchanged':
        return `${space}  ${key}: ${newValue}`;
      case 'changed':
        return [`${space}+ ${key}: ${newValue}`, `${space}- ${key}: ${oldValue}`];
      default:
        return `${space}- ${key}: ${newValue}`;
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

  return astToString(ast);
};
