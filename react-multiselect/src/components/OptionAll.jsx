import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Option from './Option'

const LABEL = "All";
const DEFAULT_CHECKED = false;

export default class OptionAll extends Component {
    constructor(props) {
        super(props);

        this.itemData = {
            key: "All",
            value: props.label
        }
    }

    static propTypes = {
        onChange: PropTypes.func,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        label: PropTypes.string,
        checked: PropTypes.bool
    }

    static defaultProps = {
        label: LABEL,
        checked: DEFAULT_CHECKED
    }

    changeHandler = ({ checked }) => {
        this.props.onChange && this.props.onChange(checked);
    }

    render() {
        const { id, checked } = this.props;
        this.itemData.checked = checked;

        return (
            <ul className="multiple-select-options multiple-select-option-all">
                <Option
                    id={`${id}-optionItemAll`}
                    itemData={this.itemData}
                    onChange={this.changeHandler} />
            </ul>
        )
    }
}