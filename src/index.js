import fs from 'fs';
import path from 'path';
import parse from './parser';
import makeAst from './ast';
import render from './render';

export default (pathToFile1, pathToFile2) => {
  const dataExtension = path.extname(pathToFile1);

  const getContent1 = fs.readFileSync(pathToFile1, 'utf-8');
  const getContent2 = fs.readFileSync(pathToFile2, 'utf-8');

  const data1 = parse(dataExtension, getContent1);
  const data2 = parse(dataExtension, getContent2);

  const ast = makeAst(data1, data2);

  return render(ast);
};
