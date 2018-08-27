import React from 'react';
import { mergeClassName } from '../utils';
import Context from '../panel-context';

export default (props) => {
    return (<Context.Consumer>{({ isExpanded  }) => isExpanded && (
        <div className={mergeClassName(props, 'la-panel__body')}>
            {props.children}
        </div>
    )}</Context.Consumer>);
};