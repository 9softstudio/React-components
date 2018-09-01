import React from 'react';
import PropTypes from 'prop-types';

import { getCurrentDate } from '../modules/constants';
import YearSelector from './YearSelector';
import MonthList from './MonthList';

const defaultFormatFunc = (month, year) => {
    return `${month < 10 ? '0' + month : month }/${year}`
}

export default class MonthPicker extends React.Component {
    constructor(props) {
        super(props);

        const { open, displayedYear, selectedMonth } = this.props;
        const now = getCurrentDate();

        const initialYear = displayedYear || now.getFullYear();

        this.state = {
            open,
            displayedYear: initialYear,
            selectedYear: initialYear,
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
        displayedYear: PropTypes.number,
        selectedMonth: PropTypes.number,
        onSelect: PropTypes.func,
        onFormat: PropTypes.func
    }

    static defaultProps = {
        open: false,
        onSelect: () => { },
        onFormat: defaultFormatFunc
    }

    toggle = () => {
        this.setState((prevState) => ({
            open: !prevState.open
        }));
    }

    handleChangeYear = (selectedValue) => {
        this.setState({ displayedYear: selectedValue }, () => this.props.onSelect(this.state.selectedMonth + 1, selectedValue));
    }

    handleSelectMonth = (selectedValue) => {
        const { displayedYear } = this.state;
        this.setState({ selectedMonth: selectedValue, selectedYear: displayedYear }, () => this.props.onSelect(selectedValue + 1, displayedYear));
    }

    render() {
        const { open, displayedYear, selectedYear, selectedMonth } = this.state;
        let { monthNames, hasRange, minMonth, minYear, maxMonth, maxYear, onFormat } = this.props;
        const displayText = onFormat(selectedMonth + 1, selectedYear);

        return (
            <div className="rmp-main-container">
                <div className='mp-form-container' onClick={this.toggle}>
                    <input type="text" className="mp-form-input" value={displayText} />
                </div>
                <div className="mp-container" style={{ display: open ? 'block' : 'none' }}>
                    <YearSelector minYear={minYear} maxYear={maxYear} displayedYear={displayedYear} onSelect={this.handleChangeYear} />
                    <MonthList monthNames={monthNames} hasRange={hasRange}
                        displayedYear={displayedYear} selectedMonth={selectedMonth} selectedYear={selectedYear}
                        minMonth={minMonth} minYear={minYear} maxMonth={maxMonth} maxYear={maxYear}
                        onSelect={this.handleSelectMonth} />
                </div>
            </div>
        )
    }
}