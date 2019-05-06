import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Translation from './translation'

const MAX_SELECTED_ITEM_FOR_DISPLAY = 3;

export default class MultipleSelectLabel extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        language: PropTypes.string,
        selectedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
        maxDisplayItemCount: PropTypes.number
    }

    static defaultProps = {
        language: 'en-US',
        maxDisplayItemCount: MAX_SELECTED_ITEM_FOR_DISPLAY
    }

    get selectedItemsString() {
        const { selectedItems, maxDisplayItemCount } = this.props;
        const selectedValues = selectedItems.map(item => item.value);
        const texts = this.props.texts || Translation[this.props.language];

        let displayText = texts.SelectOptions;
        const selectedItemCount = selectedValues.length;

        if(this.props.isAllTextShown && selectedItemCount == this.props.dataSourceSize){
            displayText = texts.All;
        }
        else if (selectedItemCount > maxDisplayItemCount) {
            displayText = texts.SelectedItemCount.replace('#', selectedItemCount);
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