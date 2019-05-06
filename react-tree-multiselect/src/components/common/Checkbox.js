import React from 'react';
import Node from './Node';
import { CheckState } from '../../models/ItemData';

const CheckStateClassNames = {
    [CheckState.Unchecked]: 'unchecked',
    [CheckState.Checked]: 'checked',
    [CheckState.Indeterminate]: 'indeterminate'
}

export default ({ onCheck, onToggle, type, data, children }) => {
    const className = 'rtms__node-checkbox ' + CheckStateClassNames[data.checkState];

    return <Node onToggle={() => onToggle(data)} expanded={data.expanded} showToggle={data.children.length > 0}>
        <label className={className}>
            <input
                type={type || "checkbox"}
                checked={data.checkState === CheckState.Checked}
                value={data.value}
                onChange={() => onCheck(data)} /> {data.text}
        </label>
        {children}
    </Node>

}