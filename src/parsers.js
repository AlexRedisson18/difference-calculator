import yaml from 'js-yaml';
import ini from 'ini';

const parseList = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};
export default (data, ext) => parseList[ext](data);
