import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MonthPicker from '../src/js/index';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MonthPicker />
        );
    }
}

ReactDOM.render( < App / > , document.getElementById("app"));