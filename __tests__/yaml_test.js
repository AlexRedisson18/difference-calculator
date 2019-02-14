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
