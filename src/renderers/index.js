import treeRender from './treeRender';
import plainRender from './plainRender';
import jsonRender from './jsonRender';

const renderList = {
  tree: treeRender,
  plain: plainRender,
  json: jsonRender,
};

export default (data, format = 'tree') => renderList[format](data);
