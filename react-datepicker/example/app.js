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

        this.state = {
            fromDate:'',
            toDate:'',
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
         const dateRange = {
           fromDate:'03/15/2019',
             toDate: '05/15/2019',
             minDate:'03/15/2000',
             maxDate:'12/30/2030',
             limitedMonthRange:3
         };
        
        var dayx=moment();
        const rangesX={
        ["Today"]:{ 
         
            startDate: dayx.clone(),
            endDate: dayx.clone()
        },
        ["Yesterday"]:{ 
         
            startDate: dayx.clone().add(-1, 'days'),
            endDate: dayx.clone().add(-1, 'days')
        },
        ["Currentweek"]{ 
         
            startDate: dayx.clone().startOf('week'),
            endDate: dayx.clone()
        },
        ["Currentmonth"]:{ 
         
            startDate: dayx.clone().startOf('month'),
            endDate: dayx.clone()
        }
        };
        return (
            <div>
                 <DateRange ranges ={rangesX} startDate={dateRange.fromDate} endDate={dateRange.toDate}
                    minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                    today={dateRange.toDate} limitedMonthRange={RANGE_MONTH_CONSTRAINT}
                    onChange={this.handleChangeDateRange} /> 
                <div>Date range: </div>
               /* <DateRange onChange={this.handleChangeDateRange} iconElement={iconElement} />*/

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
