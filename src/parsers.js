import yaml from 'js-yaml';

const parseList = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
};
export default (data, ext) => parseList[ext](data);

