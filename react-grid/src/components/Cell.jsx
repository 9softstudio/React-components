import React from 'react';

const Cell = (props) => {
    return (<td {...props}>{props.children}</td>)
}


export default Cell;