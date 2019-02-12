import fs from 'fs';
import genDiff from '..';

const commonPath = '__tests__/__fixtures__/';

test('json', () => {
  const path1 = `${commonPath}before.json`;
  const path2 = `${commonPath}after.json`;

  const expectedData = genDiff(path1, path2);
  const comparedData = fs.readFileSync(`${commonPath}result.txt`, 'utf-8');

  expect(expectedData).toBe(comparedData);
});

// Тесты падают, не могу понять причину
