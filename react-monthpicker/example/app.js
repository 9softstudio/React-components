import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MonthPicker from '../src/js/index';

export default class App extends Component {
    constructor(props) {
        super(props);

        const now = new Date();

        this.state = {
            enable: true,
            fromMonth: { month: now.getMonth() + 1, year: now.getFullYear() },
            toMonth: { month: now.getMonth() + 1, year: now.getFullYear() }
        }
    }

    handleSelect = (month, year) => {
        console.log(month, year);
        this.setState({
            fromMonth: { month, year },
            toMonth: { month, year }
        });
    }

    handleSelect2 = (month, year) => {
        console.log(month, year);
    }

    handleToggle = () => {
        this.setState((prevState) => ({
            enable: !prevState.enable
        }))
    }

    render() {
        const { fromMonth, toMonth } = this.state;

        return (
            <div>
                <div style={{ marginBottom: 15 }}><button type="button" onClick={this.handleToggle}>Enable/Disable</button></div>
                <MonthPicker onSelect={this.handleSelect} enable={this.state.enable}
                    selectedDropdownYear={fromMonth.year}
                    selectedYear={fromMonth.year}
                    selectedMonth={fromMonth.month} />

                <MonthPicker onSelect={this.handleSelect2} enable={this.state.enable}
                    selectedDropdownYear={toMonth.year}
                    selectedYear={toMonth.year}
                    selectedMonth={toMonth.month} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));