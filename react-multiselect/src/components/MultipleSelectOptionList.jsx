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

    _renderOptionList() {
        const { dataSource, onChange, id, treeViewOption } = this.props;
        if(!dataSource || !dataSource.length){
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
                    treeViewOption={treeViewOption} />
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