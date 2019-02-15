import fs from 'fs';
import genDiff from '../src';

const commonPath = '__tests__/__fixtures__';

const runTest = (before, after, result, format) => {
  const path1 = `${commonPath}/${before}`;
  const path2 = `${commonPath}/${after}`;

  const actualData = genDiff(path1, path2, format);
  const comparedData = fs.readFileSync(`${commonPath}/${result}`, 'utf-8');
  expect(actualData).toBe(comparedData);
};

const flatJson = ['before.json', 'after.json', 'result_flat.txt'];
const flatYaml = ['before.yaml', 'after.yaml', 'result_flat.txt'];
const flatIni = ['before.ini', 'after.ini', 'result_flat.txt'];
const treeJson = ['before_tree.json', 'after_tree.json', 'result_tree.txt'];
const treeYaml = ['before_tree.yaml', 'after_tree.yaml', 'result_tree.txt'];
const treeini = ['before_tree.ini', 'after_tree.ini', 'result_tree.txt'];
const plainJson = ['before_tree.json', 'after_tree.json', 'result_plain.txt', 'plain'];
const plainYaml = ['before_tree.yaml', 'after_tree.yaml', 'result_plain.txt', 'plain'];
const plainIni = ['before_tree.ini', 'after_tree.ini', 'result_plain.txt', 'plain'];
const toJson = ['before_tree.json', 'after_tree.json', 'result_json.txt', 'json'];

const testList = [
  flatIni,
  flatJson,
  flatYaml,
  treeJson,
  treeYaml,
  treeini,
  plainIni,
  plainJson,
  plainYaml,
  toJson,
];

test.each(testList)(
  'tests of different formats',
  (before, after, result, format = 'tree') => runTest(before, after, result, format),
);
