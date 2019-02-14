import fs from 'fs';
import genDiff from '../src';

const commonPath = '__tests__/__fixtures__/';

test('JSON flat diff test', () => {
  const path1 = `${commonPath}before.json`;
  const path2 = `${commonPath}after.json`;

  const actualData = genDiff(path1, path2);
  const comparedData = fs.readFileSync(`${commonPath}result_flat.txt`, 'utf-8');

  expect(actualData).toBe(comparedData);
});

test('JSON tree diff test', () => {
  const path1 = `${commonPath}before_tree.json`;
  const path2 = `${commonPath}after_tree.json`;

  const actualData = genDiff(path1, path2);
  const comparedData = fs.readFileSync(`${commonPath}result_tree.txt`, 'utf-8');

  expect(actualData).toBe(comparedData);
});