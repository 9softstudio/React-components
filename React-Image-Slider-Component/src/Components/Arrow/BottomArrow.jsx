import React, { Component } from 'react';
import Context from '../../slider-context';

export default class BottomArrow extends Component {
    render() {
        return (
            <Context.Consumer>{
                ({ onBottomArrowClick }) =>
                    <img src="img/slider-bottom-arrow.png" className="slider-arrow-position bottom-arrow" onClick={onBottomArrowClick} />
            }</Context.Consumer>);
    }
};