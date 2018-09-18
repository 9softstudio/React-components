import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { LaSlider } from '../src';

export default class App extends Component {
    handleImageClick(index) {
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

ReactDOM.render(<App />, document.getElementById("app"));