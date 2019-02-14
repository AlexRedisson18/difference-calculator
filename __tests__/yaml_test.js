import fs from 'fs';
import genDiff from '../src';

const commonPath = '__tests__/__fixtures__/';

test('yaml flat diff test', () => {
  const path1 = `${commonPath}before.yaml`;
  const path2 = `${commonPath}after.yaml`;

  const actualData = genDiff(path1, path2);
  const comparedData = fs.readFileSync(`${commonPath}result_flat.txt`, 'utf-8');

  expect(actualData).toBe(comparedData);
});

test('yaml tree diff test', () => {
  const path1 = `${commonPath}before_tree.yaml`;
  const path2 = `${commonPath}after_tree.yaml`;

  const actualData = genDiff(path1, path2);
  const comparedData = fs.readFileSync(`${commonPath}result_tree.txt`, 'utf-8');

  expect(actualData).toBe(comparedData);
});