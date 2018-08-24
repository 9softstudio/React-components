import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        header: PropTypes.bool,
        sortable: PropTypes.bool,
        sorting: PropTypes.bool,
        asc: PropTypes.bool,
        onClick: PropTypes.func
    }

    static defaultProps = {
        header: false,
        sortable: false,
        sorting: false,
        asc: true,
        onClick: function() {}
    }

    render() {
        const { header, colWidth, sortable, sorting, asc, onClick, ...rest } = this.props;
        return header
            ? (sortable 
                ? <th {...rest} className={`sortable ${sorting?'sorting':''}`} onClick={onClick}>                   
                    {this.props.children}
                    <span className={`${sorting?(asc?'asc':'desc'):''}`}></span>
                  </th>
                : <th {...rest}>{this.props.children}</th>)
            : <td {...rest}>{this.props.children}</td>;
    }
}

export default Cell;