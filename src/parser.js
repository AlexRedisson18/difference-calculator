import yaml from 'js-yaml';
import ini from 'ini';

const parseList = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (extension, data) => parseList[extension](data);
