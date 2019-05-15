import React from 'react';
import ReactDOM from 'react-dom';
import { DateRange, DatePicker } from '../src/js/index';

const iconElement = (<span className="oi oi-calendar"></span>);

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.inputDateRef = React.createRef();
        this.now = new Date();

        this.state = {
            singleDateValue: `${this.now.getMonth() + 1}/${this.now.getDate()}/${this.now.getFullYear()}`,
            isEnableSingleDate: true
        }
    }

    handleChangeDateRange = (date, isValidMonthRange = true) => {
        console.log(date, isValidMonthRange);
    }

    handleChangeDate = (date) => {
        this.setState({ singleDateValue: date });
        console.log(date)
    }

    handleClickChangeDate = () => {
        this.setState({ singleDateValue: this.inputDateRef.current.value });
    }

    handleToggle = () => {
        this.setState((prevState) => {
            return {
                isEnableSingleDate: !prevState.isEnableSingleDate
            }
        })
    }

    render() {
        const { singleDateValue, isEnableSingleDate } = this.state;
        const RANGE_MONTH_CONSTRAINT=3;
        return (
            <div>
                {/* <DateRange startDate={dateRange.fromDate} endDate={dateRange.toDate}
                    minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                    today={dateRange.toDate} limitedMonthRange={RANGE_MONTH_CONSTRAINT}
                    onChange={this.applyDateRangeHandler} /> */}
            
                <div>Date range: </div>
                <DateRange onChange={this.handleChangeDateRange}  limitedMonthRange={RANGE_MONTH_CONSTRAINT} iconElement={iconElement} />

                <div>Single Date Picker:</div>
                <DatePicker onChange={this.handleChangeDate} iconElement={iconElement} date={singleDateValue} isEnable={isEnableSingleDate} />
                <input type="text" defaultValue="" ref={this.inputDateRef} />
                <button onClick={this.handleClickChangeDate}>Change Date</button>
                <button onClick={this.handleToggle}>Toggle</button>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
