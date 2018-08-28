import React, { Component } from 'react';
import Context from '../slider-context';

export default class Slide extends Component {
    render() {
        const { imageInfo, index } = this.props;
        return (
            <Context.Consumer>{
                ({ onImageClick, currentSlideIndex }) =>
                    <img src={imageInfo.url} alt={imageInfo.text} className={`slide${index === currentSlideIndex ? " active" : ""}`} onClick={() => onImageClick(currentSlideIndex)} />
            }</Context.Consumer>);
    }
};