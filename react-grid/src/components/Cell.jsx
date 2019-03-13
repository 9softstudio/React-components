import React from 'react';
import PropTypes from 'prop-types';

const Cell = (props) => {
    const { onClick, ...rest } = props;
    
    return (<td {...rest}>{props.children}</td>)
}

    
Cell.propTypes = {
    onClick: PropTypes.func
}
 
Cell.defaultProps = {
    onClick: function() {}
}

export default Cell;