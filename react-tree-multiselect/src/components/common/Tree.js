import React from 'react';

export default (props) => {
    return <ul className="rtms__tree" data-level={props.level}>{props.children}</ul>
}