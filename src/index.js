import fs from 'fs';
import path from 'path';
import parse from './parser';
import makeAst from './ast';
import render from './renders';

export default (pathToFile1, pathToFile2, format) => {
  const dataExtension1 = path.extname(pathToFile1);
  const dataExtension2 = path.extname(pathToFile2);

  const getContent1 = fs.readFileSync(pathToFile1, 'utf-8');
  const getContent2 = fs.readFileSync(pathToFile2, 'utf-8');

  const data1 = parse(dataExtension1, getContent1);
  const data2 = parse(dataExtension2, getContent2);

  const ast = makeAst(data1, data2);

  const result = render(ast, format);

  return result;
};
