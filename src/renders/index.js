import treeRender from './treeRender';
import plainRender from './plainRender';

const renderList = {
  tree: treeRender,
  plain: plainRender,
};

export default (data, format = 'tree') => renderList[format](data);
