import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import parseInput from './utils/parseInput.js';
import { defaultClasses } from './styles.js';
import defaultOptions from './defaultOptions.js';

class PredefinedRanges extends Component {

  constructor(props, context) {
    super(props, context);

    this.styles = this.props.theme;
    this.selectedItem = this._getSelectedRange();
  }

    componentDidUpdate(prevProps, prevState) {
     if(this.props.range !== prevProps.range){
      this.selectedItem = this._getSelectedRange();
    }
  }

  _getSelectedRange() {
    const { ranges, range } = this.props;

    return Object.keys(ranges).find(name => {
      const currentRange = ranges[name];

      return range.startDate.isSame(currentRange.startDate, "day") && range.endDate.isSame(currentRange.endDate, "day");
    });
  }

  handleSelect(name, event) {
    event.preventDefault();

    this.selectedItem = name;

    const range = this.props.ranges[name];

    this.props.onSelect({
      startDate: parseInput(range['startDate'], null, 'startOf'),
      endDate: parseInput(range['endDate'], null, 'endOf'),
    });
  }

  clickButton(event, action) {
    event.preventDefault();
    this.props.buttonHandlers[action]();
  }

  renderRangeList(classes) {
    const { ranges, range, onlyClasses } = this.props;
    const { styles } = this;
    let gotActiveRange = false;

    return Object.keys(ranges).map(name => {
      const active = this.selectedItem === name;
      gotActiveRange = !gotActiveRange && active;

      const style = {
        ...styles['PredefinedRangesItem'],
        ...(gotActiveRange ? styles['PredefinedRangesItemActive'] : {}),
      };

      const predefinedRangeClass = classnames({
        [classes.predefinedRangesItem]: true,
        [classes.predefinedRangesItemActive]: gotActiveRange
      });

      return (
        <a
          href='#'
          key={'range-' + name}
          className={predefinedRangeClass}
          style={onlyClasses ? undefined : style}
          onClick={(e) => this.handleSelect(name, e)}
        >
          {name}
        </a>
      );
    });
  }

  renderRangeButtons(classes) {
    const { style, onlyClasses, locale } = this.props;
    const locales = { ...defaultOptions.locale, ...locale };
    const { styles } = this;
    const action = {
      apply: "apply",
      cancel: "cancel"
    }

    return (
      <div className={defaultClasses.rangeButtonGroup}>
        <button className={classes.applyButton}
          style={onlyClasses ? undefined : { ...styles['RangeApplyButton'], ...style }}
          type="button"
          onClick={(e) => this.clickButton(e, action.apply)}>
          {locales.applyLabel}
        </button>

        <button className={classes.cancelButton}
          style={onlyClasses ? undefined : { ...styles['RangeCancelButton'], ...style }}
          onClick={(e) => this.clickButton(e, action.cancel)}
          type="button">
          {locales.cancelLabel}
        </button>
      </div>
    )
  }

  render() {
    const { style, onlyClasses, classNames } = this.props;
    const { styles } = this;

    const classes = { ...defaultClasses, ...classNames };

    return (
      <div
        style={onlyClasses ? undefined : { ...styles['PredefinedRanges'], ...style }}
        className={classes.predefinedRanges}
      >
        {this.renderRangeList(classes)}
        {this.renderRangeButtons(classes)}
      </div>
    );
  }
}

PredefinedRanges.defaultProps = {
  onlyClasses: false,
  classNames: {}
};

PredefinedRanges.propTypes = {
  ranges: PropTypes.object.isRequired,
  onlyClasses: PropTypes.bool,
  classNames: PropTypes.object
}

export default PredefinedRanges;
