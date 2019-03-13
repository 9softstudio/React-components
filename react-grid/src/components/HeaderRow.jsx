import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HeaderRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sortBy: null,
            sortOrder: null
        }
    }

    static propTypes = {
        onSort: PropTypes.func
    }
 
    static defaultProps = {
        onSort: null
    }

    onSort = (sortBy, sortOrder) => {
        const onSort = this.props.onSort;
        this.setState({
            sortBy: sortBy,
            sortOrder: sortOrder
        },
        () => {
            onSort && onSort(sortBy, sortOrder)
        })
    }
    _renderChildren() {
        const children = this.props.children;
        const { sortBy, sortOrder } = this.state;

        // register onSort event
        return React.Children.map(children, child => {

            return React.cloneElement(child, { onSort: this.onSort, sortOrder: sortBy === child.props.sortBy ? sortOrder : null});
        });
    }

    render() {
        const { onSort, ...rest } = this.props;
        return (
            <tr {...rest}>{this._renderChildren()}</tr>
        );
    }
}