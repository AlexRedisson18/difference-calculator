import yaml from 'js-yaml';
import ini from 'ini';

const parse = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default parse;
