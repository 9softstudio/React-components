React-Image-Slider-Component
=========================
## Demo [react-image-slider-demo](https://codesandbox.io/s/p510l4x6ym)

## What's the features
1. Can config slider timer: auto change image after milliseconds a transition (setting by transitionTime combine with autoPlay of props).
2. Can config slider button position (setting by isShowLeftRightArrows/isShowTopBottomArrows of props).
3. Can option scale image (setting by width & height of props).
4. Can bind event for on image click (setting by onImageClick of props).
5. Images support extention such as: jpg, png, webp (with fallback is .jpg).

###### [click here](https://ibb.co/n0mKFU) to view sample image.

## Basic Usage
```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { LaSlider } from '../src';

export default class App extends Component {
    handleImageClick(index){
        alert(`image ${index + 1}`);
    }

    render() {
        const images = [
            { url: "img/image1.jpg", text: "image1 jpg" },
            { url: "img/image2.png", text: "image2 png" },
            { url: "img/image3.webp", text: "image3 webp" }
        ];
        return (
            <div>
                <LaSlider images={images}
                    autoPlay={true}
                    transitionTime={3000}
                    isShowLeftRightArrows={true}
                    // isShowTopBottomArrows={true}
                    width="100%"
                    height="500px"
                    arrowButtonStyles={{width: '100px', height: '100px', stroke: 'blue', strokeWidth: '2px', fillColor: 'none'}}
                    onImageClick={this.handleImageClick}/>
            </div>
        );
    }
}
```

## Props
```javascript
Slider.defaultProps = {
    images: [],
    autoPlay: false,
    transitionTime: 3000,
    isShowLeftRightArrows: false,
    isShowTopBottomArrows: false,
    width: '100%',
    height: '500px'
}

Slider.propTypes = {
    images: PropTypes.array.isRequired,
    autoPlay: PropTypes.bool,
    transitionTime: PropTypes.number,
    isShowLeftRightArrows: PropTypes.bool,
    isShowTopBottomArrows: PropTypes.bool,
    width: PropTypes.string,
    height: PropTypes.string,
    arrowButtonStyle: PropTypes.object,
    onImageClick: PropTypes.func
}
```
