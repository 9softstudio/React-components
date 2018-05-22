import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import Scroller from './Scroller';

export default class Body extends Component {
    render() {
        var { options, listVisible, normalizedData, searchValue } = this.props;
        var { showFilter, filterDelay, cssClass} = options;
        var width = options.width ? options.width :  this.props.dropdownElement.offsetWidth

        return (
            <div className={cssClass + " fdcl__dropdown"}>
                {showFilter ? <Filter width={width} onFilterChange={this.props.onFilterChange} filterDelay={filterDelay} searchValue={searchValue} /> : ""}
                <Scroller options={options} 
                          normalizedData={normalizedData} 
                          width={width}
                          onCheckChanged = {this.props.onCheckChanged}
                          onExpandClick = {this.props.onExpandClick}/>
            </div>
        );
    }
};