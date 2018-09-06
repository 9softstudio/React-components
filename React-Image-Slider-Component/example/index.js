import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { LaSlider } from '../src';

export default class App extends Component {
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
                    isShowTopBottomArrows={true}
                    width="100%"
                    height="500px"
                    arrowButtonStyle={{width: '3%', cursor: 'pointer'}}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));