import React, { Component } from 'react';
import Context from '../../slider-context';

export default class BottomArrow extends Component {
    render() {
        return (
            <Context.Consumer>{
                ({ onBottomArrowClick }) =>
                    <div className='slider-arrow-position bottom-arrow' onClick={onBottomArrowClick}>
                        <img src="img/slider-bottom-arrow.png" className="slider-arrow-position-img" />
                    </div>
            }</Context.Consumer>);
    }
};