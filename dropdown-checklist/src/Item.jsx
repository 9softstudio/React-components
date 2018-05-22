import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItems from './ListItems';
import CheckItem from './CheckItem';
import * as Constants from './Constants';

export default class Item extends Component {
    onExpandClick = (e) => {
        this.props.onExpandClick(e);
    }

    render() {
        const { item, options } = this.props;
        const { singleSelect, dropdownName } = options;

        let levelClassName = " level-" + item.level;
        let singleClassName = singleSelect === item.level ? " single " : "";
        let expandedClassName = item.expanded ? " expanded " : "";
        let rootClassName = item[Constants.DATA_KEYNAME] === 0 ? " root " : "";

        let expandElement;
        let childElements;

        if (item.items && item.items.length > 0) {
            let attributeKey = { 'data-key': item[Constants.DATA_KEYNAME] }
            expandElement = <div className="ddcl__expand" {...attributeKey} onClick={this.onExpandClick}></div>
            childElements = <ListItems items={item.items}
                options={options}
                onCheckChanged={this.props.onCheckChanged}
                onExpandClick={this.props.onExpandClick} />
        }

        return (
            <li className={Constants.LISTITEM_CLASSNAME + expandedClassName + singleClassName + rootClassName + levelClassName} style={{display: item.isDisplay ? "block" : "none"}}>
                <CheckItem item={item} options={options} onCheckChanged={this.props.onCheckChanged} />
                {expandElement}
                {childElements}
            </li>
        );
    }
};