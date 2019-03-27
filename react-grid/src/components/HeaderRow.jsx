import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HeaderRow extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        onSort: PropTypes.func
    }
 
    static defaultProps = {
        onSort: null
    }

    _renderChildren() {
        const { onSort, children, sortBy, sortOrder } = this.props;
        
        // register onSort event
        return React.Children.map(children, child => {
            return child && React.cloneElement(child, { onSort: onSort, sortOrder: sortBy === child.props.sortBy ? sortOrder : null});
        });
    }

    render() {
        const { onSort, sortBy, sortOrder, ...rest } = this.props;
        return (
            <tr {...rest}>{this._renderChildren()}</tr>
        );
    }
}