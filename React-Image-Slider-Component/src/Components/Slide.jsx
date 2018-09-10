import React, { Component } from 'react';
import Context from '../slider-context';

export default class Slide extends Component {
    render() {
        const { imageInfo, style, index } = this.props;
        const extensionOfImage = imageInfo.url.substring(imageInfo.url.lastIndexOf('.'));
        return (
            <Context.Consumer>{
                ({ onImageClick }) =>
                    <img className="slide"
                        style={style}
                        onClick={() => onImageClick(index)}
                        alt={imageInfo.text}
                        src={imageInfo.url}
                        onError={e => e.target.src = imageInfo.url.replace(extensionOfImage, '.jpg')} />
            }</Context.Consumer>);
    }
};