import fs from 'fs';
import _ from 'lodash';

const getAst = (obj1, obj2) => {
  const combinesKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  return combinesKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { name: key, value1: obj2[key], type: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { name: key, value1: obj1[key], type: 'deleted' };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        name: key, value1: obj1[key], value2: obj2[key], type: 'updated',
      };
    }
    return { name: key, value1: obj1[key] };
  });
};

const parser = (ast) => {
  const result = ast.map((elem) => {
    const {
      name, type, value1, value2,
    } = elem;

    switch (type) {
      case 'added':
        return `+ ${name}: ${value1}`;
      case 'updated':
        return [`+ ${name}: ${value1}`, `- ${name}: ${value2}`];
      case 'deleted':
        return `- ${name}: ${value1}`;
      default:
        return `  ${name}: ${value1}`;
    }
  });
  return _.flatten(result).join('\n');
};

const genDiff = (pathToFile1, pathToFile2) => {
  const fileContent1 = JSON.parse(fs.readFileSync(pathToFile1, 'utf-8'));
  const fileContent2 = JSON.parse(fs.readFileSync(pathToFile2, 'utf-8'));
  const ast = getAst(fileContent1, fileContent2);
  return parser(ast);
};

export default genDiff;
