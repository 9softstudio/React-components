import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import * as Constants from './Constants';

export default class ListItems extends Component {
    render() {
        var { items, options } = this.props;
        return (
            <ul className="ddcl">
                {items.map((item) =>
                    <Item key={item[Constants.DATA_KEYNAME]} 
                          item={item} 
                          options={options} 
                          onCheckChanged = {this.props.onCheckChanged}
                          onExpandClick = {this.props.onExpandClick}/>
                )}
            </ul>
        );
    }
};