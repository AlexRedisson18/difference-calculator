import fs from 'fs';
import genDiff from '../src';

const commonPath = '__tests__/__fixtures__/';

test('JSON simple diff test', () => {
  const path1 = `${commonPath}before.json`;
  const path2 = `${commonPath}after.json`;

  const actualData = genDiff(path1, path2);
  const comparedData = fs.readFileSync(`${commonPath}result.txt`, 'utf-8');

  expect(actualData).toBe(comparedData);
});

test('yaml simple diff test', () => {
  const path1 = `${commonPath}before.yaml`;
  const path2 = `${commonPath}after.yaml`;

  const actualData = genDiff(path1, path2);
  const comparedData = fs.readFileSync(`${commonPath}result.txt`, 'utf-8');

  expect(actualData).toBe(comparedData);
});

test('ini simple diff test', () => {
  const path1 = `${commonPath}before.ini`;
  const path2 = `${commonPath}after.ini`;

  const actualData = genDiff(path1, path2);
  const comparedData = fs.readFileSync(`${commonPath}result.txt`, 'utf-8');

  expect(actualData).toBe(comparedData);
});