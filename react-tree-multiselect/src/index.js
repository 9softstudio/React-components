import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Trunk from './components/Trunk';
import buildDataTree from './utils/buildDataTree';
import ItemData, { CheckState } from './models/ItemData';
import Context from './models/Context';

const data = [
    { name: 'a', id: 1, },
    { name: 'aa', id: 2, parentId: 1 },
    { name: 'aaa', id: 3, parentId: 2 },

    { name: 'ab', id: 4, },
    { name: 'aa', id: 5, parentId: 4 },
    { name: 'bb', id: 6, parentId: 4 }
]

const updateArray = (arr, oldItem, newItem) => {
    return arr.map(r => r === oldItem ? newItem : r);
}

const updateParent = (nodes, oldNode, newNode) => {
    while (newNode.parent >= 0) {
        const parent = Object.assign(new ItemData(), nodes[newNode.parent]);
        parent.children = updateArray(parent.children, oldNode, newNode);
        oldNode = nodes[oldNode.parent];
        newNode = parent;
        nodes[newNode.index] = newNode;
    }

    return newNode;
}

const autoCheckDown = (nodes, nodeData) => {
    if (nodeData.children.length) {
        nodeData.children = nodeData.children.map(c => {
            if (c.checkState === nodeData.checkState) {
                return c;
            }

            nodes[c.index] = Object.assign(new ItemData(), c, { checkState: nodeData.checkState });
            autoCheckDown(nodes, nodes[c.index]);
            return nodes[c.index];
        });
    }
}

const autoCheckUp = (nodes, nodeData) => {
    while (nodeData.parent >= 0) {
        const parent = nodes[nodeData.parent];
        parent.checkState = getChidrenCheckState(parent.children);
        nodeData = parent;
    }
}

const getChidrenCheckState = (children) => {
    let state = CheckState.Indeterminate;

    for (let i = 0; i < children.length; i++) {
        const checkState = children[i].checkState;

        if (checkState === CheckState.Indeterminate ||
            (state !== checkState && state !== CheckState.Indeterminate)) {
            return CheckState.Indeterminate;
        }

        if (state === CheckState.Indeterminate) {
            state = checkState;
        }
    }

    return state;
}

class TreeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromProps({ data, idName, displayName, parentIdName }, state) {
        if (state.original === data) {
            return null;
        }

        const nodes = [];
        const rootNode = buildDataTree(data || [], idName, displayName, parentIdName, nodes);

        return { rootNode, nodes, original: data };
    }

    onToggle(itemData) {
        const nodes = [...this.state.nodes];
        nodes[itemData.index] = Object.assign(new ItemData(), itemData, { expanded: !itemData.expanded });

        const rootNode = updateParent(nodes, itemData, nodes[itemData.index]);

        this.setState({ rootNode, nodes });
    }

    onCheck(itemData) {
        const nodes = [...this.state.nodes];
        const checkState = itemData.checkState === CheckState.Checked ? CheckState.Unchecked : CheckState.Checked;

        const newItemData = nodes[itemData.index] = Object.assign(new ItemData(), itemData, { checkState });
        autoCheckDown(nodes, newItemData);

        const rootNode = updateParent(nodes, itemData, newItemData);
        autoCheckUp(nodes, newItemData);

        this.setState({ rootNode, nodes });
    }

    render() {
        const contextValue = {
            rootNode: this.state.rootNode,
            nodes: this.state.nodes,
            onToggle: itemData => this.onToggle(itemData),
            onCheck: itemData => this.onCheck(itemData)
        };
        return <Context.Provider value={contextValue}><Trunk /></Context.Provider>
    }
}

TreeSelect.defaultProps = {
    idName: 'id',
    parentIdName: 'parentId',
    displayName: 'name'
}


ReactDOM.render(<TreeSelect data={data} />, document.getElementById('app'))