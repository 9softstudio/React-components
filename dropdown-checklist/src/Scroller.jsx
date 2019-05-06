import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItems from './ListItems';

export default class Scroller extends Component {
    render() {
        const {options, normalizedData, width} = this.props;
        const {height} = options;
        
        return (
            <div className={height ? "fdcl__scroller" : ""} style={{ height: height, width: width }}>
                <ListItems  items={normalizedData} 
                            options={options}
                            onCheckChanged = {this.props.onCheckChanged}
                            onExpandClick = {this.props.onExpandClick}/>
            </div>
        );
    }
};