import React, { Component } from 'react';
import Context from '../slider-context';
import { mergeClassName } from '../utils';

export default class Slide extends Component {
    render() {
        const { imageInfo, index } = this.props;
        const extensionOfImage = imageInfo.url.substring(imageInfo.url.lastIndexOf('.'));
        return (
            <Context.Consumer>{
                ({ onImageClick }) =>
                <div className={mergeClassName(this.props, 'slide')} onClick={() => onImageClick(index)}>
                    <img alt={imageInfo.text} src={imageInfo.url} onError={e => e.target.src = imageInfo.url.replace(extensionOfImage, '.jpg')} />
                    <h1>{imageInfo.text}</h1>
                </div>
            }</Context.Consumer>);
    }
};