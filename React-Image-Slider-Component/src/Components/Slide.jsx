import React, { Component } from 'react';
import Context from '../slider-context';

export default class Slide extends Component {
    render() {
        const { imageInfo, style, index } = this.props;
        return (
            <Context.Consumer>{
                ({ onImageClick }) =>
                    <img src={imageInfo.url}
                        alt={imageInfo.text}
                        className="slide"
                        onClick={() => onImageClick(index)}
                        style={style} />
            }</Context.Consumer>);
    }
};