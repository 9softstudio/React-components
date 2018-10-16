import React from 'react';
import ReactDOM from 'react-dom';
import { DateRange, DatePicker } from './dist/index';

const iconElement = (<span className="oi oi-calendar"></span>);

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChangeDateRange = (date, isValidMonthRange = true) => {
        console.log(date, isValidMonthRange);
    }

    handleChangeDate = (date) => {
        console.log(date)
    }

    render() {
        return (
            <div>
                {/* <DateRange startDate={dateRange.fromDate} endDate={dateRange.toDate}
                    minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                    today={dateRange.toDate} limitedMonthRange={RANGE_MONTH_CONSTRAINT}
                    onChange={this.applyDateRangeHandler} /> */}
                <div>Date range: </div>
                <DateRange onChange={this.handleChangeDateRange} iconElement={iconElement} />

                <div>Single Date Picker:</div>
                <DatePicker onChange={this.handleChangeDate} iconElement={iconElement} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));