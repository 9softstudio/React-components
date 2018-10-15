import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import parseInput from './utils/parseInput.js';
import DayCell from './DayCell.js';
import getTheme, { defaultClasses } from './styles.js';
import { MomentFormat } from './constants';

const START_OF_MONTH = 0;
const END_OF_MONTH = 11;
const START_DAY_OF_MONTH = 1;
const DEFAULT_YEAR_RANGE = 5;

function checkRange(dayMoment, range) {
  return (
    dayMoment.isBetween(range['startDate'], range['endDate']) ||
    dayMoment.isBetween(range['endDate'], range['startDate'])
  )
}

function checkStartEdge(dayMoment, range) {
  const { startDate } = range;

  return dayMoment.startOf('day').isSame(startDate.startOf('day'));
}

function checkEndEdge(dayMoment, range) {
  const { endDate } = range;

  return dayMoment.endOf('day').isSame(endDate.endOf('day'));
}

function isOusideMinMax(dayMoment, minDate, maxDate, format) {
  return (
    (minDate && dayMoment.isBefore(parseInput(minDate, format, 'startOf'))) ||
    (maxDate && dayMoment.isAfter(parseInput(maxDate, format, 'endOf')))
  )
}

class Calendar extends Component {
  constructor(props, context) {
    super(props, context);

    const { format, range, theme, offset, firstDayOfWeek, shownDate } = props;

    const date = parseInput(props.date, format, 'startOf');
    let showDate = (shownDate || range && range['endDate'] || date).clone();
    const state = {
      date,
      shownDate: showDate,
      firstDayOfWeek: (firstDayOfWeek || moment.localeData().firstDayOfWeek())
    }

    this.state = state;
    this.styles = getTheme(theme);
  }

  componentDidMount() {
    const { onInit } = this.props;
    onInit && onInit(this.state.date);
  }

  get limitedDate() {
    const { minDate, maxDate } = this.props;
    const m = moment();
    let startDate, endDate;

    if (minDate) {
      startDate = moment.isMoment(minDate) ? minDate : moment(minDate, MomentFormat.default);
    }
    else {
      startDate = moment([m.year() - DEFAULT_YEAR_RANGE, START_OF_MONTH]);
    }

    if (maxDate) {
      endDate = moment.isMoment(maxDate) ? maxDate : moment(maxDate, MomentFormat.default);
    }
    else {
      endDate = moment([m.year(), END_OF_MONTH]).endOf("month");
    }


    return { startDate, endDate }
  }

  get disablePrevButton() {
    const range = this.limitedDate;
    const startDate = range.startDate;
    const currentDate = this.state.shownDate;
    let prevMonth = this.state.shownDate.month() - 1;

    if (prevMonth < startDate.month() && currentDate.year() <= startDate.year()) {
      return true;
    }

    return false;
  }

  get disableNextButton() {
    const range = this.limitedDate;
    const endDate = range.endDate;
    const currentDate = this.state.shownDate;
    let nextMonth = this.state.shownDate.month() + 1;

    if (nextMonth > endDate.month() && currentDate.year() >= endDate.year()) {
      return true;
    }

    return false;
  }

  getShownDate() {
    const { link } = this.props;

    const shownDate = link || this.state.shownDate;

    return shownDate;
  }

  handleSelect(newDate) {
    const { link, onChange } = this.props;

    onChange && onChange(newDate);

    if (!link) {
      this.setState({ date: newDate });
    }
  }

  nextButtonClickHandler(event) {
    event.preventDefault();

    if (!this.disableNextButton) {
      this.changeMonth(this.state.shownDate.month() + 1, event);
    }
  }

  prevButtonClickHandler(event) {
    event.preventDefault();
    if (!this.disablePrevButton) {
      this.changeMonth(this.state.shownDate.month() - 1, event);
    }
  }

  changeMonth(direction, event) {
    event.preventDefault();
    let selectedMonth = Number(direction);
    let year = this.state.shownDate.year();

    if (selectedMonth < START_OF_MONTH) {
      selectedMonth = END_OF_MONTH;
      year -= 1;
    }

    if (selectedMonth > END_OF_MONTH) {
      selectedMonth = START_OF_MONTH;
      year += 1;
    }

    const { link, linkCB } = this.props;

    let newDate = moment([year, selectedMonth, this.state.shownDate.date()]);
    if (!newDate.isValid()) {
      newDate = moment([year, selectedMonth, START_DAY_OF_MONTH]);
    }

    if (link && linkCB) {
      return linkCB(newDate);
    }

    this.setState({
      shownDate: newDate
    });
  }

  changeYear(event) {
    event.preventDefault();

    const selectedYear = Number(event.target.value);
    let newDate = moment([selectedYear, this.state.shownDate.month(), this.state.shownDate.date()]);
    if (!newDate.isValid()) {
      newDate = moment([selectedYear, this.state.shownDate.month(), START_DAY_OF_MONTH]);
    }

    this.setState({
      shownDate: newDate
    });
  }

  renderMonthList(classes) {
    const { styles } = this;
    const { onlyClasses, locale } = this.props;
    const monthLabels = locale.months;

    let monthOptions = [];
    for (let i = 0; i < 12; i++) {
      const isDisabled = this._isDisabledMonth(i);
      monthOptions.push(<option disabled={isDisabled} key={`month${i}`} value={i}>{monthLabels[i]}</option>);
    }

    return (
      <select style={onlyClasses ? undefined : styles["MonthAndYearSelect"]} className={classes.monthAndYearSelect}
        onChange={(e) => this.changeMonth(e.target.value, e)} value={this.state.shownDate.month()}>
        {monthOptions}
      </select>
    );
  }

  _isDisabledMonth(currentMonth) {
    const range = this.limitedDate;
    const currentYear = this.state.shownDate.year();

    return currentMonth < range.startDate.month() && currentYear <= range.startDate.year()
      || currentMonth > range.endDate.month() && currentYear >= range.endDate.year();
  }

  renderYearList(classes) {
    const { styles } = this;
    const { onlyClasses } = this.props;
    const range = this.limitedDate;

    const yearOptions = [];
    for (let i = range.startDate.year(); i <= range.endDate.year(); i++) {
      yearOptions.push(<option key={`year${i}`} value={i}>{i}</option>);
    }

    return (
      <select style={onlyClasses ? undefined : styles["MonthAndYearSelect"]} className={classes.monthAndYearSelect}
        onChange={this.changeYear.bind(this)} value={this.state.shownDate.year()}>
        {yearOptions}
      </select>
    );
  }

  renderMonthAndYear(classes) {
    const shownDate = this.getShownDate();
    const year = shownDate.year();
    const { styles } = this;
    const { minDate, maxDate, onlyClasses, showMonthArrow } = this.props;

    return (
      <div style={onlyClasses ? undefined : styles['MonthAndYear']} className={classes.monthAndYearWrapper}>
        {
          showMonthArrow ?
            <button
              type="button" disabled={this.disablePrevButton}
              style={onlyClasses ? undefined : { ...styles['MonthButton'], float: 'left' }}
              className={classes.prevButton}
              onClick={this.prevButtonClickHandler.bind(this)}>
              <i style={onlyClasses ? undefined : { ...styles['MonthArrow'], ...styles['MonthArrowPrev'] }}></i>
            </button> : null
        }
        <span>
          <span className={classes.month}>{this.renderMonthList(classes)}</span>
          <span className={classes.monthAndYearDivider}>&nbsp;</span>
          <span className={classes.year}>{this.renderYearList(classes)}</span>
        </span>
        {
          showMonthArrow ?
            <button
              type="button" disabled={this.disableNextButton}
              style={onlyClasses ? undefined : { ...styles['MonthButton'], float: 'right' }}
              className={classes.nextButton}
              onClick={this.nextButtonClickHandler.bind(this)}>
              <i style={onlyClasses ? undefined : { ...styles['MonthArrow'], ...styles['MonthArrowNext'] }}></i>
            </button> : null
        }
      </div>
    )
  }

  renderWeekdays(classes) {
    const dow = this.state.firstDayOfWeek;
    const weekdays = [];
    const { styles } = this;
    const { onlyClasses, locale } = this.props;
    const weekDays = locale.weekdays;

    const dayLength = 7 + dow;
    for (let i = dow; i < dayLength; i++) {
      const weekDayIndex = i % 7;
      const day = weekDays[weekDayIndex];
      weekdays.push(
        <span style={onlyClasses ? undefined : styles['Weekday']} className={classes.weekDay} key={i + day}>{day}</span>
      );
    }

    return weekdays;
  }

  renderDays(classes) {
    // TODO: Split this logic into smaller chunks
    const { styles } = this;

    const { range, minDate, maxDate, format, onlyClasses, disableDaysBeforeToday, specialDays } = this.props;

    const shownDate = this.getShownDate();
    const { date, firstDayOfWeek } = this.state;
    const dateUnix = date.unix();

    const monthNumber = shownDate.month();
    const dayCount = shownDate.daysInMonth();
    const startOfMonth = shownDate.clone().startOf('month').isoWeekday();

    const lastMonth = shownDate.clone().month(monthNumber - 1);
    const lastMonthNumber = lastMonth.month();
    const lastMonthDayCount = lastMonth.daysInMonth();

    const nextMonth = shownDate.clone().month(monthNumber + 1);
    const nextMonthNumber = nextMonth.month();

    const days = [];

    // Previous month's days
    const diff = (Math.abs(firstDayOfWeek - (startOfMonth + 7)) % 7);
    for (let i = diff - 1; i >= 0; i--) {
      const dayMoment = lastMonth.clone().date(lastMonthDayCount - i);
      days.push({ dayMoment, isPassive: true });
    }

    // Current month's days
    for (let i = 1; i <= dayCount; i++) {
      const dayMoment = shownDate.clone().date(i);
      // set days before today to isPassive
      var _today = moment()
      if (disableDaysBeforeToday && Number(dayMoment.diff(_today, "days")) <= -1) {
        days.push({ dayMoment, isPassive: true });
      } else {
        days.push({ dayMoment });
      }
    }

    // Next month's days
    const remainingCells = 42 - days.length; // 42cells = 7days * 6rows
    for (let i = 1; i <= remainingCells; i++) {
      const dayMoment = nextMonth.clone().date(i);
      days.push({ dayMoment, isPassive: true });
    }

    const today = moment().startOf('day');
    return days.map((data, index) => {
      const { dayMoment, isPassive } = data;
      const isSelected = !range && (dayMoment.unix() === dateUnix);
      const isInRange = range && checkRange(dayMoment, range);
      const isStartEdge = range && checkStartEdge(dayMoment, range);
      const isEndEdge = range && checkEndEdge(dayMoment, range);
      const isEdge = isStartEdge || isEndEdge;
      const isToday = today.isSame(dayMoment);
      const isSunday = dayMoment.day() === 0;
      const isSpecialDay = specialDays && specialDays.some((specialDay) => {
        return dayMoment.endOf('day').isSame(specialDay.date.endOf('day'));
      });
      const isOutsideMinMax = isOusideMinMax(dayMoment, minDate, maxDate, format);

      return (
        <DayCell
          onSelect={this.handleSelect.bind(this)}
          { ...data }
          theme={styles}
          isStartEdge={isStartEdge}
          isEndEdge={isEndEdge}
          isSelected={isSelected || isEdge}
          isInRange={isInRange}
          isSunday={isSunday}
          isSpecialDay={isSpecialDay}
          isToday={isToday}
          key={index}
          isPassive={isPassive || isOutsideMinMax}
          onlyClasses={onlyClasses}
          classNames={classes}
        />
      );
    })
  }

  render() {
    const { styles } = this;
    const { onlyClasses, classNames } = this.props;

    const classes = { ...defaultClasses, ...classNames };

    return (
      <div style={onlyClasses ? undefined : { ...styles['Calendar'], ...this.props.style }} className={classes.calendar}>
        <div className={classes.monthAndYear}>{this.renderMonthAndYear(classes)}</div>
        <div className={classes.weekDays}>{this.renderWeekdays(classes)}</div>
        <div className={classes.days}>{this.renderDays(classes)}</div>
      </div>
    )
  }
}

Calendar.defaultProps = {
  format: MomentFormat.default,
  theme: {},
  showMonthArrow: true,
  disableDaysBeforeToday: false,
  onlyClasses: false,
  classNames: {},
  specialDays: [],
}

Calendar.propTypes = {
  showMonthArrow: PropTypes.bool,
  disableDaysBeforeToday: PropTypes.bool,
  lang: PropTypes.string,
  sets: PropTypes.string,
  range: PropTypes.shape({
    startDate: PropTypes.object,
    endDate: PropTypes.object
  }),
  minDate: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  maxDate: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  date: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
  format: PropTypes.string.isRequired,
  firstDayOfWeek: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  onInit: PropTypes.func,
  link: PropTypes.oneOfType([PropTypes.shape({
    startDate: PropTypes.object,
    endDate: PropTypes.object,
  }), PropTypes.bool]),
  linkCB: PropTypes.func,
  theme: PropTypes.object,
  onlyClasses: PropTypes.bool,
  specialDays: PropTypes.array,
  classNames: PropTypes.object,
  locale: PropTypes.object
}

export default Calendar;
