react date picker
=========================
React 16
## Install
```
npm i @9softstudio/react-datepicker
```
## Demos
### [react-datepicker](https://9softstudio.github.io/React-components/react-datepicker/example/index.html)

## Usage
```javascript
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
                <div>Date range: </div>
                <DateRange onChange={this.handleChangeDateRange} iconElement={iconElement} />

                <div>Single Date Picker:</div>
                <DatePicker onChange={this.handleChangeDate} iconElement={iconElement} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
```
## DateRange Props
```javascript
DateRange.defaultProps = {
  linkedCalendars: false,
  theme: {},
  format: MomentFormat.default,
  calendars: 2,
  onlyClasses: true,
  classNames: {},
  specialDays: [],
  twoStepChange: false,
  showRange: true,
  iconElement: (<i className="icon icon-calendar"></i>)
}

DateRange.propTypes = {
  format: PropTypes.string,
  firstDayOfWeek: PropTypes.number,
  calendars: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  startDate: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  endDate: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  minDate: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  maxDate: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  dateLimit: PropTypes.func,
  ranges: PropTypes.object,
  linkedCalendars: PropTypes.bool,
  twoStepChange: PropTypes.bool,
  theme: PropTypes.object,
  onInit: PropTypes.func,
  onChange: PropTypes.func,
  onlyClasses: PropTypes.bool,
  specialDays: PropTypes.array,
  classNames: PropTypes.object,
  onClickApplyButton: PropTypes.func,
  showRange: PropTypes.bool,
  limitedMonthRange: PropTypes.number,
  today: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  iconElement: PropTypes.any
}
```

## DatePicker Props
```javascript
DatePicker.defaultProps = {
  format: "MM/DD/YYYY",
  iconElement: (<i className="icon icon-calendar"></i>)
}

DatePicker.propTypes = {
    format: PropTypes.string,
    firstDayOfWeek: PropTypes.number,
    minDate: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
    maxDate: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
    classNames: PropTypes.object,
    onChange: PropTypes.func,
    onInit: PropTypes.func,
    locale: PropTypes.object,
    date: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
    iconElement: PropTypes.any
}
```

## License

MIT