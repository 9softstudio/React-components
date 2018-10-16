import React, { Component } from 'react'
import PropTypes from 'prop-types'

import parseInput from './utils/parseInput'
import defaultOptions from './utils/defaultOptions'
import { MomentFormat } from './utils/constants'
import { defaultClasses } from './utils/styles'

import Overlay from './Overlay'
import Calendar from './Calendar'

export default class DatePicker extends Component {
    constructor(props) {
        super(props);

        const { locale, date, format } = props;

        this.locale = { ...defaultOptions.locale, ...locale };

        const selectedDate = parseInput(date, format, 'startOf');
        this.state = {
            selectedDate,
            show: false
        }
    }

    static propTypes = {
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

    static defaultProps = {
        format: MomentFormat.default,
        iconElement: (<i className="icon icon-calendar"></i>)
    }

    get dateText() {
        const { selectedDate } = this.state;
        if (selectedDate) {
            return `${selectedDate.format(this.props.format)}`;
        }

        return "";
    }

    handleSelect = (date) => {
        const { onChange } = this.props;

        onChange && onChange(date);

        this.setState({ selectedDate: date, show: false });
    }

    show = () => {
        this.setState({ show: true });
    }

    close = () => {
        this.setState({ show: false });
    }

    render() {
        const { format, firstDayOfWeek, minDate, maxDate, classNames, iconElement } = this.props;
        const classes = { ...defaultClasses, ...classNames };
        const { show } = this.state;

        return (
            <div className="daterange-container">
                <div className="daterange-label" onClick={this.show}>
                    <input readOnly className="input-text datepicker" type="text" autoComplete="off" value={this.dateText} />
                    {iconElement}
                </div>

                <Overlay isOpening={show} onClose={this.close}>
                    <div className={classes.dateRange}>
                        <Calendar
                            shownDate={this.state.selectedDate}
                            format={format}
                            firstDayOfWeek={firstDayOfWeek}
                            minDate={minDate}
                            maxDate={maxDate}
                            classNames={classNames}
                            onChange={this.handleSelect}
                            locale={this.locale} />
                    </div>
                </Overlay>
            </div>
        )
    }
}