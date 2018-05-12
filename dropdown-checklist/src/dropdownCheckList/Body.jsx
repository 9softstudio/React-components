import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';

export default class Body extends Component {
    getScrollerElement = () => {
        var { height, cssClass, width, mode, dropdownName, filterDelay } = this.props.options;
        var { dropdownElement, normalizedData } = this.props;

        width = width ? width : dropdownElement.offsetWidth;
        var scrollerElement = <div className={height ? "fdcl__scroller" : ""} style={{ height: height, width: width }}>
                                {this.createListElement(normalizedData)}
                            </div>;

        return scrollerElement;
    }

    createListElement = (items) => {
        var elements = [];

        for (var i = 0; i < items.length; i++) {
            elements.push(this.createListItemElement(items[i]));
        }

        return <ul className="ddcl">{elements}</ul>;
    }

    createListItemElement = (item) => {
        var { singleSelect, dataKeyName, listItemClassName, dropdownName } = this.props.options;

        var levelClassName = " level-" + item.level;
        var singleClassName = singleSelect === item.level ? " single " : "";
        var expandedClassName = item.expanded ? " expanded " : "";
        var rootClassName = item[dataKeyName] === 0 ? " root " : "";

        var expandElement;
        var childElements;

        if (item.items && item.items.length > 0) {
            let attributeKey = { 'data-key': item[dataKeyName] }
            expandElement = <div className="ddcl__expand" {...attributeKey} onClick={this.onExpandClick}></div>
            childElements = this.createListElement(item.items);
        }

        return <li key={item[dataKeyName]} className={listItemClassName + expandedClassName + singleClassName + rootClassName + levelClassName}>
            {this.createCheckItemElement(item)}
            {expandElement}
            {childElements}
        </li>;
    }

    createCheckItemElement = (item) => {
        var { singleSelect, selectableLevel, itemCheckClassName, dataKeyName } = this.props.options;

        var inputChild = "";
        if ((!singleSelect || singleSelect <= item.level) &&
            (selectableLevel === -1 || item.level <= selectableLevel)) {

            let inputProps = {
                checked: item.checked,
                onChange: this.onCheckChanged,
                className: itemCheckClassName,
                type: "checkbox",
                value: item[dataKeyName]
            };

            inputChild = <input {...inputProps} />;
        }

        return <label className="ddci">{inputChild}<div className="ddci__text">{item.text}</div></label>;

    }

    //#Region Utilities
    onCheckChanged = (e) => {
       this.props.onCheckChanged(e);
    }

    onExpandClick = (e) => {
        this.props.onExpandClick(e);
    } 

    onFilterChange = (value) => {
        this.props.onFilterChange();
    }
    //#EndRegion Utilities

    render() {
        var { options, listVisible } = this.props;
        var { showFilter, filterDelay, cssClass, width } = options;
        return (
            <div className={cssClass + " fdcl__dropdown"}>
                {showFilter ? <Filter width={width} onFilterChange={this.onFilterChange} filterDelay={filterDelay} /> : ""}
                {this.getScrollerElement()}
            </div>
        );
    }
};