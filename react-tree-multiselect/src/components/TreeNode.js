import React from 'react';
import Checkbox from './common/Checkbox';
import Branch from './Branch';
import Context from '../models/Context';

export default ({ index }) => {
    return <Context.Consumer>{({ nodes, onToggle, onCheck }) =>
        <Checkbox data={nodes[index]} onToggle={onToggle} onCheck={onCheck}>
            {!!nodes[index].children.length && nodes[index].expanded && <Branch index={index} />}
        </Checkbox>
    }</Context.Consumer>
}