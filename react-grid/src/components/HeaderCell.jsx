import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HeaderCell extends Component {
    constructor(props) {
        super(props);

    }

    static propTypes = {
        sortOrder: PropTypes.string,
        sortBy: PropTypes.string,
        onSort: PropTypes.func
    }
 
    static defaultProps = {
        sortOrder: null,
        sortBy: null,
        onSort: null
    }

    onClick = () => {
        if(!this.props.sortBy){
            return;
        }
        const { onSort } = this.props;
        const sortOrder = this.props.sortOrder;

        const newSortOrder = !sortOrder || sortOrder === 'desc' ? 'asc' : 'desc';
        onSort && onSort(this.props.sortBy, newSortOrder);
    }

    render() {
        const { colWidth, sortBy, sortOrder, onSort, children, ...rest } = this.props;
    
        let sortableHeader = null;
        if(sortBy) {
            const upArrow = <div style={{display:'block', color: `${sortOrder === 'asc' ? '#111':'#777'}`}} className={'asc'}></div>
            const downArrow = <div style={{display:'block', marginTop:'2px', color: `${sortOrder === 'desc' ? '#111':'#777'}`}} className={'desc'}></div>
            sortableHeader = (<th {...rest} className={'sortable sorting'} style={{position:'relative', backgroundClip: 'padding-box'}} onClick={this.onClick}>                   
                <div style={{width:'90%'}}>{children}</div>
                <span style={{float: 'right', position:'absolute', top:'40%', right:'2px'}}>
                    {upArrow}
                    {downArrow}
                </span>
                
            </th>)
        }

        return sortableHeader || 
            (<th {...rest}>{children}</th>)
    }
}