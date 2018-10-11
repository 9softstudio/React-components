
import React from 'react';
import Tree from './common/Tree';
import TreeNode from './TreeNode';
import Context from '../models/Context';

export default () => {
    return <Context.Consumer>{({ rootNode }) =>
        <Tree level={rootNode.level}>
            <TreeNode index={rootNode.index} />
        </Tree>
    }</Context.Consumer>
}
