import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Option from './Option'

export default class MultipleSelectOptionList extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        onChange: PropTypes.func,
        treeViewOption: PropTypes.shape({
            childrenField: PropTypes.string,
            keyField: PropTypes.string,
            valueField: PropTypes.string,
            statusField: PropTypes.string
        })
    }

    onCollapse = (item, isCollapsed) => {
        const { dataSource, onCollapse } = this.props;
        const newDataSource = [...dataSource];
        const children = dataSource.filter(x => x.parentKey === item.key);
        
        const updateVisibilityForChildren = (subList) => {
            for (let i = 0; i < subList.length; i++) {
                const itemChild = subList[i];
                const childIndex = newDataSource.findIndex(x => x.key === itemChild.key);
                newDataSource[childIndex] = { ...newDataSource[childIndex], visible: !isCollapsed };

                const nestedChildren = newDataSource.filter(x => x.parentKey === itemChild.key);
                if (nestedChildren.length > 0) {
                    updateVisibilityForChildren(nestedChildren);
                }
            }
        }

        updateVisibilityForChildren(children);

        onCollapse && onCollapse(newDataSource);
    }

    _renderOptionList() {
        const { dataSource, onChange, id, treeViewOption } = this.props;
        if (!dataSource || !dataSource.length) {
            return <span>No information</span>
        }

        const optionList = dataSource.map((item, index) => {
            const hasChildren = dataSource.filter(x => x.parentKey === item.key).length > 0;
            return item.visible && (
                <Option
                    id={`${id}-optionItem-${index}`}
                    key={`${id}optionItem${index}`}
                    itemData={item}
                    onChange={onChange}
                    hasChildren={hasChildren}
                    treeViewOption={treeViewOption}
                    onCollapse={this.onCollapse} />
            )
        });

        return optionList;
    }

    render() {
        return (
            <ul className="multiple-select-options">
                {this._renderOptionList()}
            </ul>
        )
    }
}