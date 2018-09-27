import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const NO_SELECTED_LABEL = "Select options";
const MAX_SELECTED_ITEM_FOR_DISPLAY = 3;

export default class MultipleSelectLabel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            noneSelectedLabel: props.noneSelectedLabel
        }
    }

    static propTypes = {
        selectedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
        noneSelectedLabel: PropTypes.string,
        maxDisplayItemCount: PropTypes.number
    }

    static defaultProps = {
        noneSelectedLabel: NO_SELECTED_LABEL,
        maxDisplayItemCount: MAX_SELECTED_ITEM_FOR_DISPLAY
    }

    get selectedItemsString() {
        const { selectedItems, noneSelectedLabel, maxDisplayItemCount } = this.props;
        const selectedValues = selectedItems.map(item => item.value);

        let displayText = noneSelectedLabel;
        const selectedItemCount = selectedValues.length;

        if (selectedItemCount >= maxDisplayItemCount) {
            displayText = `${selectedItemCount} selected`;
        }
        else if (selectedItemCount >= 1) {
            displayText = selectedValues.join(", ");
        }

        return displayText;
    }

    render() {
        return (
            <button type="button" className="multiple-select-default multiple-select-label"
                onClick={this.props.onToggle}>
                <span className="text-display" title={this.selectedItemsString}>{this.selectedItemsString}</span>
                <b className="caret"></b>
            </button>
        )
    }
}