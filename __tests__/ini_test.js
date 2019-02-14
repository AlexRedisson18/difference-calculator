import fs from 'fs';
import genDiff from '../src';

const commonPath = '__tests__/__fixtures__/';

test('ini flat diff test', () => {
  const path1 = `${commonPath}before.ini`;
  const path2 = `${commonPath}after.ini`;

  const actualData = genDiff(path1, path2);
  const comparedData = fs.readFileSync(`${commonPath}result_flat.txt`, 'utf-8');

   expect(actualData).toBe(comparedData);
});

test('ini tree diff test', () => {
  const path1 = `${commonPath}before_tree.ini`;
  const path2 = `${commonPath}after_tree.ini`;

  const actualData = genDiff(path1, path2);
  const comparedData = fs.readFileSync(`${commonPath}result_tree.txt`, 'utf-8');

  expect(actualData).toBe(comparedData);
});