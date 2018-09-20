React-Popup-Component
=========================
## Demo [react-popup-demo](https://codesandbox.io/s/0oj590l5nw)

## Basic Usage
```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { LaPopup, LaButton } from '../src';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = ({ isShowPopup: false });
    }

    onButtonCloseClick(){
        this.setState({
            isShowPopup: false
        });
    }

    onButtonCloseClick(){
        alert("icon close be clicked");
        this.setSateOfIsShowPopup(false);
    }

    onButtonCancelClick(){
        alert("button cancel be clicked");
        this.setSateOfIsShowPopup(false);
    }

    onButtonCreateClick(){
        alert("button create be clicked");
        this.setSateOfIsShowPopup(false);
    }

    showPopup(){
        this.setSateOfIsShowPopup(true);
    }

    setSateOfIsShowPopup(isShowPopup){
        this.setState({
            isShowPopup: isShowPopup
        });
    }

    render() {
        const buttons = [
            <LaButton text="Cancel" className="laBtn laBtn-dark" onButtonClick={() => this.onButtonCancelClick()} />,
            <LaButton text="Create" className="laBtn laBtn-submit" onButtonClick={() => this.onButtonCreateClick()} />
        ];

        return (
            <div>
                <button onClick={() => this.showPopup()}>Click me to show popup</button>
                {this.state.isShowPopup && 
                <LaPopup title="This is title" 
                        buttons={buttons} 
                        onCloseClick={() => this.onButtonCloseClick()} 
                        popupInnerClassName={"mt200 w500 h180"}
                        >
                    <h5>Content: <a href="https://www.w3schools.com" target="_blank">visit w3schools online web tutorials</a></h5>
                </LaPopup>}     
            </div>
        );
    }
}
```

## Props
```javascript
Popup.propTypes = {
    onCloseClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    buttons: PropTypes.array,
    popupInnerClassName: PropTypes.string
}

Button.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    onButtonClick: PropTypes.func.isRequired
}
```
