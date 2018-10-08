import React from 'react';
import PropTypes from 'prop-types';

import { getCurrentDate } from '../modules/constants';
import YearSelector from './YearSelector';
import MonthList from './MonthList';

const defaultFormatFunc = (month, year) => {
    return `${month < 10 ? '0' + month : month}/${year}`
}

export default class MonthPicker extends React.Component {
    constructor(props) {
        super(props);

        const { open, selectedDropdownYear, selectedMonth, selectedYear } = this.props;
        const now = getCurrentDate();

        const initialYear = selectedDropdownYear || now.getFullYear();

        this.state = {
            open,
            selectedDropdownYear: initialYear,
            selectedYear: selectedYear || initialYear,
            selectedMonth: selectedMonth ? selectedMonth - 1 : now.getMonth()
        }

        this.container = React.createRef();
    }

    static propTypes = {
        open: PropTypes.bool,
        minMonth: PropTypes.number,
        minYear: PropTypes.number,
        maxMonth: PropTypes.number,
        maxYear: PropTypes.number,
        monthNames: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        hasRange: PropTypes.bool,
        selectedDropdownYear: PropTypes.number,
        selectedMonth: PropTypes.number,
        onSelect: PropTypes.func,
        onFormat: PropTypes.func,
        isReadonly: PropTypes.bool,
        iconElement: PropTypes.any,
        enable: PropTypes.bool
    }

    static defaultProps = {
        open: false,
        onSelect: () => { },
        onFormat: defaultFormatFunc,
        isReadonly: true,
        enable: true
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutSide, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutSide, true);
    }

    componentDidUpdate(prevProps, prevState) {
        const { selectedDropdownYear, selectedMonth, selectedYear } = this.props;

        if (selectedMonth !== prevProps.selectedMonth || 
            selectedYear !== prevProps.selectedYear || 
            selectedDropdownYear !== prevProps.selectedDropdownYear) {
            this.setState({
                selectedYear: selectedDropdownYear,
                selectedMonth: selectedMonth - 1,
                selectedDropdownYear
            });
        }
    }

    toggle = () => {
        if (this.props.enable) {
            this.setState((prevState) => ({
                open: !prevState.open
            }));
        }
    }

    handleChangeYear = (selectedValue) => {
        this.setState({ selectedDropdownYear: selectedValue });
    }

    handleSelectMonth = (selectedValue) => {
        const { selectedDropdownYear } = this.state;
        this.setState({
            selectedMonth: selectedValue,
            selectedYear: selectedDropdownYear,
            open: false
        },
            () => this.props.onSelect(selectedValue + 1, selectedDropdownYear));
    }

    handleClickOutSide = (event) => {
        const containerElement = this.container.current;
        const clickOutside = containerElement && !containerElement.contains(event.target);

        if (clickOutside && this.state.open) {
            this.setState({ open: false });
        }
    }

    render() {
        const { open, selectedDropdownYear, selectedYear, selectedMonth } = this.state;
        let { monthNames, hasRange, minMonth, minYear, maxMonth, maxYear, isReadonly, onFormat, iconElement, enable } = this.props;
        const displayText = onFormat(selectedMonth + 1, selectedYear);
        const inputClassName = enable ? 'mp-form-container' : 'mp-form-container disable';

        return (
            <div className="rmp-main-container">
                <div className={inputClassName} onClick={this.toggle}>
                    <input type="text" className="mp-form-input" value={displayText} readOnly={isReadonly} />
                    {iconElement}
                </div>
                <div className="mp-container" style={{ display: open ? 'block' : 'none' }} ref={this.container}>
                    <YearSelector minYear={minYear} maxYear={maxYear} selectedDropdownYear={selectedDropdownYear} onSelect={this.handleChangeYear} />
                    <MonthList monthNames={monthNames} hasRange={hasRange}
                        selectedDropdownYear={selectedDropdownYear} selectedMonth={selectedMonth} selectedYear={selectedYear}
                        minMonth={minMonth} minYear={minYear} maxMonth={maxMonth} maxYear={maxYear}
                        onSelect={this.handleSelectMonth} />
                </div>
            </div>
        )
    }
}