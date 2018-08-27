import React, { Component } from 'react';
import Context from '../../slider-context';

export default class TopArrow extends Component {
    render() {
        return (
            <Context.Consumer>{
                ({ onTopArrowClick }) =>
                    <div className='slider-arrow-position top-arrow' onClick={onTopArrowClick}>
                        <img src="img/slider-top-arrow.png" className="slider-arrow-position-img" />
                    </div>
            }</Context.Consumer>);
    }
};