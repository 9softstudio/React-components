import React from 'react';
import PropTypes from 'prop-types';

export default class MonthList extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        monthNames: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
        disableFutureMonth: PropTypes.bool
    }

    static defaultProps = {
        disableFutureMonth: true
    }

    _renderMonth = () => {
        const { monthNames } = this.props;
        const monthList = [];
        for (var i = 0; i < monthNames.length; i++) {
            var monthRow = monthNames[i];

            var minRange = range[0];
            var maxRange = range[1];

            month.push('<tr class="mp-row">');
            for (var j = 0; j < monthRow.length; j++) {
                var currentMonth = i * monthRow.length + j;
                var isDisable = (selectedYear <= minRange.getFullYear() && currentMonth < minRange.getMonth()) ||
                    (selectedYear >= maxRange.getFullYear() && currentMonth > maxRange.getMonth());

                var disableClass = isDisableFutureMonth && isDisable ? "mp-disabled" : "";
                month.push('<td><button class="mp-btn-month ' + disableClass + '" data-month="' + currentMonth + '">' + monthRow[j] + '</button></td>');
            }
            month.push('</tr>');
        }
    }

    render() {
        return (
            <table className="mp-month-table">
                <tbody>
                    <tr className="mp-row">
                        <td><button className="mp-btn-month">Jan</button></td>
                        <td><button className="mp-btn-month">Feb</button></td>
                        <td><button className="mp-btn-month">Mar</button></td>
                    </tr>
                    <tr className="mp-row">
                        <td><button className="mp-btn-month">Apr</button></td>
                        <td><button className="mp-btn-month">May</button></td>
                        <td><button className="mp-btn-month">Jun</button></td>
                    </tr>
                    <tr className="mp-row">
                        <td><button className="mp-btn-month">Jul</button></td>
                        <td><button className="mp-btn-month">Aug</button></td>
                        <td><button className="mp-btn-month mp-disabled">Sep</button></td>
                    </tr>
                    <tr className="mp-row">
                        <td><button className="mp-btn-month mp-disabled">Oct</button></td>
                        <td><button className="mp-btn-month mp-disabled">Nov</button></td>
                        <td><button className="mp-btn-month mp-disabled">Dec</button></td>
                    </tr>
                </tbody>
            </table>
        )
    }
}