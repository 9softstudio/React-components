import React from 'react';
import PropTypes from 'prop-types';

import { defaultMinYear, getCurrentDate } from '../modules/constants';

export default class YearSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        minYear: PropTypes.number,
        maxYear: PropTypes.number,
        selectedDropdownYear: PropTypes.number,
        onSelect: PropTypes.func
    }

    static defaultProps = {
        minYear: defaultMinYear,
        onSelect: () => { }
    }

    _getYearList() {
        let { minYear, maxYear } = this.props;
        maxYear = maxYear || getCurrentDate().getFullYear();

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

    handleSelect = (event) => {
        const { value } = event.target;
        this.props.onSelect(Number(value));
    }

    render() {
        const { selectedDropdownYear } = this.props;
        const yearList = this._getYearList();
        const selectedValue = selectedDropdownYear || (yearList.length && yearList[0]);

        return (
            <div className="mp-header">
                <select className="mp-select-year" value={selectedValue} onChange={this.handleSelect}>
                    {
                        yearList.map(y => {
                            return (<option key={y} value={y}>{y}</option>);
                        })
                    }
                </select>
            </div>
        )
    }
}