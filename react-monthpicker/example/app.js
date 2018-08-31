import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MonthPicker from '../src/js/index';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    handleSelect = (month, year) => {
        console.log(month, year);
    }

    render() {
        return (
            <MonthPicker onSelect={this.handleSelect} />
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));