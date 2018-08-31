import React from 'react';
import PropTypes from 'prop-types';

import YearSelector from './YearSelector';
import MonthList from './MonthList';

const defaultMonthNames = [
    ['Jan', 'Feb', 'Mar'],
    ['Apr', 'May', 'Jun'],
    ['Jul', 'Aug', 'Sep'],
    ['Oct', 'Nov', 'Dec']
]

export default class MonthPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    static propTypes = {
        open: PropTypes.bool,
        minYear: PropTypes.number,
        maxYear: PropTypes.number,
        monthNames: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        disableFutureMonth: PropTypes.bool
    }

    static defaultProps = {
        open: false,
        minYear: 2000,
        monthNames: defaultMonthNames,
        disableFutureMonth: true
    }

    toggle = () => {
        this.setState((prevState) => ({
            open: !prevState.open
        }));
    }

    _getYearList() {
        let { minYear, maxYear } = this.props;
        maxYear = maxYear || (new Date()).getFullYear();

        if (minYear > maxYear) {
            const temp = minYear;
            minYear = maxYear;
            maxYear = temp;
        }

        const yearList = [];
        for (let i = maxYear; i >= minYear; i--) {
            yearList.push(i);
        }

        return yearList;
    }

    handleChangeYear = (selectedYear) => {
        console.log(selectedYear);
    }

    render() {
        const { open } = this.state;
        const { monthNames, disableFutureMonth } = this.props;
        const yearList = this._getYearList();

        return (
            <div className="rmp-main-container">
                <div className='mp-form-container' onClick={this.toggle}>
                    <input type="text" className="mp-form-input" />
                </div>
                <div className="mp-container" style={{ display: open ? 'block' : 'none' }}>
                    <YearSelector yearList={yearList} onSelect={this.handleChangeYear} />
                    <MonthList monthNames={monthNames} disableFutureMonth={disableFutureMonth} />
                </div>
            </div>
        )
    }
}