import React from 'react';
import PropTypes from 'prop-types';

export default class YearSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        yearList: PropTypes.arrayOf(PropTypes.number).isRequired,
        selectedYear: PropTypes.number,
        onSelect: PropTypes.func
    }

    static defaultProps = {
        onSelect: () => { }
    }

    handleSelect = (event) => {
        const { value } = event.target;
        this.props.onSelect(Number(value));
    }

    render() {
        const { yearList, selectedYear } = this.props;
        const selectedValue = selectedYear || (yearList.length && yearList[0]);

        return (
            <div className="mp-header">
                <select className="mp-select-year" defaultValue={selectedValue} onChange={this.handleSelect}>
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