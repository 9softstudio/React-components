import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Option extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCollapse: false
        }
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

    onCollapse = (event) => {
        event.preventDefault();

        this.setState(prevState => ({ isCollapse: !prevState.isCollapse }), () => {
            const { itemData, onCollapse } = this.props;
            onCollapse && onCollapse(itemData, this.state.isCollapse);
        });
    }

    onChange = (event) => {
        event.stopPropagation();

        const { itemData, onChange } = this.props;

        const newItemData = { ...itemData, checked: !itemData.checked };
        onChange && onChange(newItemData);
    }

    render() {
        const { itemData, id, treeViewOption, hasChildren } = this.props;
        const { value, checked, level } = itemData;
        const itemClassName = `multiple-select-item ${treeViewOption ? 'treeview-select-item' : ''} level-${level}`;
        const itemStyle = treeViewOption ? { paddingLeft: level * treeViewOption.indent } : null;

        const caretClassName = this.state.isCollapse ? 'treeview-caret collapse' : 'treeview-caret';

        return (
            <li className={itemClassName} style={itemStyle}>
                {
                    !!treeViewOption && hasChildren &&
                    <button className="btnCaretOption" onClick={this.onCollapse}><b className={caretClassName}></b></button>
                }
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