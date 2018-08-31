import React from 'react';
import PropTypes from 'prop-types';

import { getCurrentDate } from '../modules/constants';
import YearSelector from './YearSelector';
import MonthList from './MonthList';

export default class MonthPicker extends React.Component {
    constructor(props) {
        super(props);

        const { open, selectedYear, selectedMonth } = this.props;
        const now = getCurrentDate();

        const initialYear = selectedYear || now.getFullYear();

        this.state = {
            open,
            selectedYear: initialYear,
            prevSelectedYear: initialYear,
            selectedMonth: selectedMonth ? selectedMonth - 1 : now.getMonth()
        }
    }

    static propTypes = {
        open: PropTypes.bool,
        minMonth: PropTypes.number,
        minYear: PropTypes.number,
        maxMonth: PropTypes.number,
        maxYear: PropTypes.number,
        monthNames: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        hasRange: PropTypes.bool,
        selectedYear: PropTypes.number,
        selectedMonth: PropTypes.number,
        onSelect: PropTypes.func
    }

    static defaultProps = {
        open: false,
        onSelect: () => { }
    }

    toggle = () => {
        this.setState((prevState) => ({
            open: !prevState.open
        }));
    }

    handleChangeYear = (selectedValue) => {
        console.log(selectedValue);
        console.log(this.state);
        this.setState({ selectedYear: selectedValue }, () => this.props.onSelect(this.state.selectedMonth + 1, selectedValue));
    }

    handleSelectMonth = (selectedValue) => {
        console.log(selectedValue);
        const { selectedYear } = this.state;
        this.setState({ selectedMonth: selectedValue, prevSelectedYear: selectedYear }, () => this.props.onSelect(selectedValue + 1, selectedYear));
    }

    render() {
        const { open, selectedYear, prevSelectedYear, selectedMonth } = this.state;
        let { monthNames, hasRange, minMonth, minYear, maxMonth, maxYear } = this.props;

        return (
            <div className="rmp-main-container">
                <div className='mp-form-container' onClick={this.toggle}>
                    <input type="text" className="mp-form-input" />
                </div>
                <div className="mp-container" style={{ display: open ? 'block' : 'none' }}>
                    <YearSelector minYear={minYear} maxYear={maxYear} selectedYear={selectedYear} onSelect={this.handleChangeYear} />
                    <MonthList monthNames={monthNames} hasRange={hasRange}
                        selectedYear={selectedYear} selectedMonth={selectedMonth} prevSelectedYear={prevSelectedYear}
                        minMonth={minMonth} minYear={minYear} maxMonth={maxMonth} maxYear={maxYear}
                        onSelect={this.handleSelectMonth} />
                </div>
            </div>
        )
    }
}