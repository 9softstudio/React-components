React-Image-Slider-Component
=========================
## Demo [react-image-slider-demo](https://codesandbox.io/s/p510l4x6ym)

## What's the features
1. Can config slider timer: auto change image after milliseconds a transition (setting by transitionTime combine with autoPlay of props).
2. Can config slider button position (setting by navPosition of props (horizontal, vertical or none)).
3. Can option scale image (setting by width & height of props).
4. Can bind event for on image click (setting by onImageClick of props).
5. Images support extention such as: jpg, png, webp (with fallback is jpg).

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
            { url: "img/image1.jpg", text: "A JavaScript library for building user interfaces" },
            { url: "img/image2.png", text: "Sass is the most mature, stable, and powerful professional grade CSS extension language in the world." },
            { url: "img/image3.webp", text: "Webp with fallback jpg" },
            { url: "https://coolicehost.com/images/http2-how-it-works.jpg", text: "what's server push ?" },
            { url: "https://i.ytimg.com/vi/FhF6HodC6Fw/maxresdefault.jpg", text: "Socket.IO is a library that enables real-time, bidirectional and event-based communication between the browser and the server" }
        ];
        return (
            <div>
                <LaSlider images={images}
                    autoPlay={true}
                    transitionTime={3000}
                    navPosition="horizontal"//vertical
                    width="100%"
                    height="500px"
                    stylesOfNavPosition={{ width: '100px', height: '100px', stroke: 'blue', strokeWidth: '2px', fillColor: 'none' }}
                    onImageClick={this.handleImageClick} />
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
    navPosition: "none",
    width: '100%',
    height: '500px'
}

Slider.propTypes = {
    images: PropTypes.array.isRequired,
    autoPlay: PropTypes.bool,
    transitionTime: PropTypes.number,
    navPosition: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    stylesOfNavPosition: PropTypes.object,
    onImageClick: PropTypes.func
}
```
