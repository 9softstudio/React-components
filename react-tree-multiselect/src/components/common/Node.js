import React from 'react';

export default (props) => {
    const toggleClassName = 'rtms__toggle' + (props.expanded ? '' : ' collapsed');
    
    return <li className="rtms__node">
        {props.showToggle && <span className={toggleClassName} onClick={props.onToggle} />}{props.children}
    </li>
}