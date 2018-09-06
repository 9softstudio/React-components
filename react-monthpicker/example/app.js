import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MonthPicker from '../src/js/index';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            enable: true
        }
    }

    handleSelect = (month, year) => {
        console.log(month, year);
    }

    handleToggle = () => {
        this.setState((prevState) => ({
            enable: !prevState.enable
        }))
    }

    render() {
        return (
            <div>
                <div style={{marginBottom: 15}}><button type="button" onClick={this.handleToggle}>Enable/Disable</button></div>
                <MonthPicker onSelect={this.handleSelect} enable={this.state.enable} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));