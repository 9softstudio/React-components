import React, { Component } from 'react';
import Context from '../../slider-context';

export default class LeftArrow extends Component {
    render() {
        return (
            <Context.Consumer>{
                ({ onLeftArrowClick }) =>
                    <div className='slider-arrow-position left-arrow' onClick={onLeftArrowClick}>
                        <img src="img/slider-left-arrow.png" className="slider-arrow-position-img" />
                    </div>
            }</Context.Consumer>);
    }
};