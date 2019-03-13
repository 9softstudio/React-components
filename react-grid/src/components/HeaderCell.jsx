import React from 'react';
import PropTypes from 'prop-types';

const HeaderCell = (props) => {
    const { colWidth, sortable, sorting, asc, onClick, ...rest } = props;
    
        let sortableHeader = null;
        if(sortable) {
            const upArrow = <div style={{display:'block', color: `${sorting && asc ? '#111':'#777'}`}} className={'asc'}></div>
            const downArrow = <div style={{display:'block', marginTop:'2px', color: `${sorting && !asc ? '#111':'#777'}`}} className={'desc'}></div>
            sortableHeader = (<th {...rest} className={'sortable sorting'} onClick={onClick}>                   
        <span>{props.children}</span>
                                <span style={{float: 'right', marginTop:'5px'}}>
                                {upArrow}
                                {downArrow}
                                </span>
                            </th>)
        }

    return (sortable 
            ? sortableHeader
            : <th {...rest}>{props.children}</th>)
}

    
HeaderCell.propTypes = {
    sortable: PropTypes.bool,
    sorting: PropTypes.bool,
    asc: PropTypes.bool,
    onClick: PropTypes.func
}
 
HeaderCell.defaultProps = {
    sortable: false,
    sorting: false,
    asc: true,
    onClick: function() {}
}

export default HeaderCell;