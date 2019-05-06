import React from 'react';
import Tree from './common/Tree';
import TreeNode from './TreeNode';
import Context from '../models/Context';

export default ({ index }) => {
    return <Context.Consumer>{({ nodes }) =>
        <Tree level={nodes[index].level + 1}>
            {nodes[index].children.map(r => <TreeNode index={r.index} key={r.index} />)}
        </Tree>
    }</Context.Consumer>
}