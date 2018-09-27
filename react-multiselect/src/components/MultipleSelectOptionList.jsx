import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Option from './Option'

export default class MultipleSelectOptionList extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        onChange: PropTypes.func
    }

    _renderOptionList() {
        const { dataSource, onChange, id } = this.props;
        if(!dataSource || !dataSource.length){
            return <span>No information</span>
        }

        const optionList = dataSource.map((item, index) => {
            return (
                <Option
                    id={`${id}-optionItem-${index}`}
                    key={`${id}optionItem${index}`}
                    itemData={item}
                    onChange={onChange} />
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