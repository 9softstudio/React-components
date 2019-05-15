react date picker
=========================
React 16
## Install
```
npm i @9softstudio/react-datepicker --save-dev
```
## Demos
### [react-datepicker](https://9softstudio.github.io/React-components/react-datepicker/example/index.html)

## Usage
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { DateRange, DatePicker } from '../src/js/index';
import moment from 'moment';

const iconElement = (<span className="oi oi-calendar"></span>);

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.inputDateRef = React.createRef();
        this.now = new Date();

        this.dateInfo = {
            fromDate:'03/15/2019',
            toDate: '05/15/2019',
            minDate:'03/15/2000',
            maxDate:'12/30/2030',
            limitedMonthRange:3
        };

        this.state = {
            fromDate: this.dateInfo.fromDate,
            toDate: this.dateInfo.toDate,
            singleDateValue: `${this.now.getMonth() + 1}/${this.now.getDate()}/${this.now.getFullYear()}`,
            isEnableSingleDate: true
        }
    }

    handleChangeDateRange = (date, isValidMonthRange = true) => {
        console.log(date, isValidMonthRange);
        this.setState({fromDate:date.startDate,toDate:date.endDate});
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

        const now = moment();
        const myRanges={
            ["Today"]:{       
                startDate: now.clone(),
                endDate: now.clone()
            },
            ["Yesterday"]:{          
                startDate: now.clone().add(-1, 'days'),
                endDate: now.clone().add(-1, 'days')
            },
            ["Current Week"]:{          
                startDate: now.clone().startOf('week'),
                endDate: now.clone()
            },
            ["Current Month"]:{          
                startDate: now.clone().startOf('month'),
                endDate: now.clone()
            }
        };

        const dateInfo = this.dateInfo;
        const {fromDate, toDate} = this.state;

        return (
            <div>
                <div>Date range: </div>
                <DateRange onChange={this.handleChangeDateRange} iconElement={iconElement} />

                <div>Date range with customizing range</div>
                <DateRange startDate={fromDate} endDate={toDate}
                    minDate={dateInfo.minDate} maxDate={dateInfo.maxDate}
                    today={dateInfo.toDate} limitedMonthRange={dateInfo.limitedMonthRange}
                    onChange={this.handleChangeDateRange}
                    iconElement={iconElement}
                    ranges={myRanges} />

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
  ranges: PropTypes.object, // To define the ranges. Ex: const ranges = {['Today']: {startDate: moment(), endDate: startDate: moment()}, ['Yesterday']: {...}}
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
