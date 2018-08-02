import React from 'react';
import { mergeClassName } from '../utils';
import Context from '../panel-context';

export default (props) => {
    return (<Context.Consumer>{({ onToggleCollapse, collapsible }) => (
        <div className={mergeClassName(props, 'la-panel__header')}>
            {collapsible && (<span className="la-panel__indicator" onClick={onToggleCollapse} />)}
            {props.children}
        </div>
    )}</Context.Consumer>);
};