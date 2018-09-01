import React from 'react';
import PropTypes from 'prop-types';

import { defaultMinYear, getCurrentDate } from '../modules/constants';

const defaultMonthNames = [
    ['Jan', 'Feb', 'Mar'],
    ['Apr', 'May', 'Jun'],
    ['Jul', 'Aug', 'Sep'],
    ['Oct', 'Nov', 'Dec']
]

export default class MonthList extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        monthNames: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        minMonth: PropTypes.number,
        minYear: PropTypes.number,
        maxMonth: PropTypes.number,
        maxYear: PropTypes.number,
        displayedYear: PropTypes.number,
        selectedYear: PropTypes.number,
        selectedMonth: PropTypes.number,
        hasRange: PropTypes.bool
    }

    static defaultProps = {
        hasRange: true,
        monthNames: defaultMonthNames,
        minMonth: 1,
        minYear: defaultMinYear,
        onSelect: () => { }
    }

    _renderMonth = () => {
        const { monthNames } = this.props;
        const monthList = [];
        for (let i = 0; i < monthNames.length; i++) {
            const monthRow = monthNames[i];
            monthList.push(this._buildRow(monthRow, i));
        }

        return monthList;
    }

    _buildRow(monthRow, index) {
        const { displayedYear, selectedYear } = this.props;
        const selectedMonth = this.props.selectedMonth === undefined ? getCurrentDate().getMonth() : this.props.selectedMonth;

        return (
            <tr key={index} className="mp-row">
                {
                    monthRow.map((cell, j) => {
                        const currentMonth = index * monthRow.length + j;
                        const isDisabled = this.props.hasRange && !this._isInRange(currentMonth);
                        const disableClass = isDisabled ? "mp-disabled" : "";
                        const activeClass = displayedYear === selectedYear && selectedMonth === currentMonth ? "mp-active" : "";

                        return (
                            <td key={cell}>
                                <button className={`mp-btn-month ${disableClass} ${activeClass}`}
                                    onClick={() => !isDisabled && this.props.onSelect(currentMonth)}>
                                    {cell}
                                </button>
                            </td>
                        )
                    })
                }
            </tr>
        )
    }

    _isInRange(currentMonth) {
        let { minMonth, minYear, maxMonth, maxYear, displayedYear } = this.props;
        const now = getCurrentDate();
        maxYear = maxYear || now.getFullYear();
        maxMonth = maxMonth ? maxMonth - 1 : now.getMonth();
        displayedYear = displayedYear || now.getFullYear();

        const isValidMinRange = displayedYear > minYear || (displayedYear === minYear && currentMonth >= minMonth - 1);
        const isValidMaxRange = displayedYear < maxYear || (displayedYear === maxYear && currentMonth <= maxMonth);

        return isValidMinRange && isValidMaxRange;
    }

    render() {
        return (
            <table className="mp-month-table">
                <tbody>
                    {this._renderMonth()}
                </tbody>
            </table>
        )
    }
}