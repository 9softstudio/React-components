import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Option extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        itemData: PropTypes.object.isRequired,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        onChange: PropTypes.func,
        treeViewOption: PropTypes.shape({
            childrenField: PropTypes.string,
            keyField: PropTypes.string,
            valueField: PropTypes.string,
            statusField: PropTypes.string
        })
    }

    onChange = (event) => {
        event.stopPropagation();

        const { itemData, onChange } = this.props;

        const newItemData = {
            key: itemData.key,
            value: itemData.value,
            checked: !itemData.checked
        }
        onChange && onChange(newItemData);
    }

    render() {
        const { itemData, id, treeViewOption } = this.props;
        const { value, checked, level } = itemData;
        const itemClassName = `multiple-select-item level-${level}`;
        const itemStyle = treeViewOption ? { paddingLeft: level * treeViewOption.indent } : null;

        return (
            <li className={itemClassName} style={itemStyle}>
                <input
                    id={id}
                    type="checkbox"
                    className="option-checkbox"
                    checked={checked}
                    onChange={this.onChange}
                />
                <label className="option-label" htmlFor={id}>
                    {value}
                </label>
            </li>
        );
    }
}