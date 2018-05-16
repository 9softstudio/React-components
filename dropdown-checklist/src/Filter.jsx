import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Filter extends Component {
    onClearFilterClick = () => {
        this.inputText.value = "";
        this.onFilterChange();
    }

    onFilterChange = () => {
        if (this.filterDelayId > 0) {
            clearTimeout(this.filterDelayId);
        }
        this.filterDelayId = setTimeout(() => {
            this.filterDelayId = 0; this.filterDelayId = 0;
            this.props.onFilterChange(this.inputText.value);
        }, this.props.filterDelay * 1000);

    }

    render() {
        return (
            <div className="ddft" style={{width: this.props.width}}>
                <input className='ddft__input' type='text' placeholder='Filter' autoFocus onChange={this.onFilterChange} ref={inputText => { this.inputText = inputText}}/>
                <div className='ddft__clear' onClick={this.onClearFilterClick}>×</div>
            </div>
        );
    }
};