import React, { Component } from 'react';
import Context from '../../slider-context';

export default class RightArrow extends Component {
    render() {
        return (
            <Context.Consumer>{
                ({ onRightArrowClick }) =>
                    <div className='slider-arrow-position right-arrow' onClick={onRightArrowClick}>
                        <img src="img/slider-right-arrow.png" className="slider-arrow-position-img" />
                    </div>
            }</Context.Consumer>);
    }
};