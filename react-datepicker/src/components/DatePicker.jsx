import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import parseInput from './utils/parseInput.js'
import defaultOptions from './defaultOptions.js'
import { MomentFormat } from './constants'
import { defaultClasses } from './styles.js'
import joiningClassNames from 'classnames'

import Overlay from '../Overlay'
import Calendar from './Calendar.js'

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
        date: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string])
    }

    static defaultProps = {
        format: MomentFormat.default
    }

    get dateText() {
        const { selectedDate } = this.state;
        if (selectedDate) {
            return `${selectedDate.format(this.props.format)}`;
        }

        return "";
    }

    handleSelect(date) {
        const { onChange } = this.props;

        onChange && onChange(date);

        this.setState({ selectedDate: date, show: false });
    }

    show = () => {
        this.setState({ show: true });
    }

    render() {
        const { format, firstDayOfWeek, minDate, maxDate, classNames } = this.props;
        const classes = { ...defaultClasses, ...classNames };
        const { show } = this.state;

        return (
            <div className="daterange-container">
                <div className="daterange-label" onClick={this.show}>
                    <input readOnly className="input-text datepicker" type="text" autoComplete="off" value={this.dateText} />
                    <i className="icon icon-calendar"></i>
                </div>

                <Overlay isOpening={show}>
                    <div className={classes.dateRange}>
                        <Calendar
                            shownDate={this.state.selectedDate}
                            format={format}
                            firstDayOfWeek={firstDayOfWeek}
                            minDate={minDate}
                            maxDate={maxDate}
                            classNames={classNames}
                            onChange={this.handleSelect.bind(this)}
                            locale={this.locale} />
                    </div>
                </Overlay>
            </div>
        )
    }
}