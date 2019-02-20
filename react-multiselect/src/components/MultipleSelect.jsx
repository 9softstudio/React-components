import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MultipleSelectLabel from './MultipleSelectLabel'
import MultipleSelectOptionList from './MultipleSelectOptionList'
import OptionAll from './OptionAll'

const KEY_NAME = "key";
const VALUE_NAME = "value";
const STATUS_NAME = "checked";

let id = 1;

export default class MultipleSelect extends Component {
    constructor(props) {
        super(props);
        this.searchInputBox = null;
        this.id = `multiple-select-${props.id || id++}`;
        this.originalDataSource = this._convertDataSourceToState(props);

        this.state = {
            searchText: '',
            showOptionList: false,
            dataSource: this.originalDataSource
        }
    }

    static propTypes = {
        dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
        keyField: PropTypes.string,
        valueField: PropTypes.string,
        statusField: PropTypes.string,
        noneSelectedLabel: PropTypes.string,
        optionAllLabel: PropTypes.string,
        maxDisplayItemCount: PropTypes.number,
        onChange: PropTypes.func,
        hasAllOption: PropTypes.bool,
        hasSearchBox: PropTypes.bool
    }

    static defaultProps = {
        keyField: KEY_NAME,
        valueField: VALUE_NAME,
        statusField: STATUS_NAME,
        hasAllOption: true,
        hasSearchBox: false
    }

    componentDidMount() {
        document.addEventListener('click', this._handleDocumentClick)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._handleDocumentClick)
    }

    get selectedItems() {
        return this.originalDataSource.filter(item => item.checked);
    }

    onChangeHandler = (item) => {
        const { keyField, valueField, statusField } = this.props;

        const selectedItem = {
            [keyField]: item.key,
            [valueField]: item.value,
            [statusField]: item.checked
        }

        const newDataSource = this.state.dataSource.slice(0);
        const itemToUpdate = newDataSource.find(x => x.key === item.key);
        itemToUpdate.checked = item.checked;

        this._callBackToParent(selectedItem);

        this.setState({ dataSource: newDataSource });
    }
    
    onToggle = () => {
        this.setState((prevState) => { return { showOptionList: !prevState.showOptionList } },
            () => {
                if(this.searchInputBox && this.state.showOptionList){
                    this.searchInputBox.focus();
                }
            })
    }

    checkAllHandler = (checked) => {
        this.originalDataSource.forEach((item) => { item.checked = checked });

        const searchText = this.state.searchText;
        const dataSource = this.originalDataSource.filter(item => item[VALUE_NAME].startsWith(searchText));
        this.setState({ dataSource: dataSource });
        this._callBackToParent(null);
    }

    onChangeSearchText = (value) => {
        this.setState((prevState) => {
            const dataSource = this.originalDataSource.filter(item => item[VALUE_NAME].startsWith(value));

            return { 
                searchText: value,
                dataSource : dataSource
            }
        })
    }

    onClearSearch = () => {
        this.setState({searchText: ''}, () => this.onChangeSearchText(''))
    }

    _callBackToParent(selectedItem) {
        const selectedItemsKey = this._getSelectedItemKey(this.originalDataSource);
        this.props.onChange && this.props.onChange(selectedItem, selectedItemsKey);
    }

    _convertDataSourceToState({ keyField, valueField, statusField, dataSource }) {
        return dataSource.map(item => {
            return {
                [KEY_NAME]: item[keyField],
                [VALUE_NAME]: item[valueField],
                [STATUS_NAME]: item[statusField]
            }
        })
    }

    _getSelectedItemKey(dataSource) {
        const selectedItemKey = [];

        for (let i = 0; i < dataSource.length; i++) {
            const item = dataSource[i];

            if (item.checked) {
                selectedItemKey.push(item.key)
            }
        }

        return selectedItemKey.join(",");
    }

    _close = () => {
        this.setState({ showOptionList: false });
    }

    _handleDocumentClick = (event) => {
        const clickOutside = this.wrapper && !this.wrapper.contains(event.target);
        if (clickOutside && this.state.showOptionList) {
            this._close();
        }
    }

    _renderOptionAll() {
        if (this.props.hasAllOption) {
            const checkedItemCount = this.originalDataSource.filter(x => x.checked).length;
            const checkedAll = checkedItemCount === this.originalDataSource.length;
            
            return (<OptionAll id={this.id} checked={checkedAll} label={this.props.optionAllLabel} onChange={this.checkAllHandler} />);
        }

        return null;
    }

    _renderSearchBox(){
        if(!this.props.hasSearchBox)
        {
            return null;
        }

        const clearButtonStyle =  { 
            position: "absolute",
            right: "5px",
            width: "20px",
            height: "20px",
            border: 0,
            margin: "5px",
            backgroundColor: "transparent",
            cursor: "pointer"}

        return (<div style={{width:"100%"}}>
                        <input autoFocus  onChange={(e) => this.onChangeSearchText(e.target.value)} 
                            ref={element => this.searchInputBox = element}
                            value={this.state.searchText} type="text" placeholder="Search data" 
                            style={{width:"100%", border: "1px solid #ccc", padding: "5px 10px", 
                            boxSizing: "border-box",}} />
        <button onClick={this.onClearSearch} style={clearButtonStyle}>X</button>
        </div>)
    }

    render() {
        const { noneSelectedLabel, maxDisplayItemCount } = this.props;
    
        return (
            <div className="multiple-select-container" id={this.id} ref={element => this.wrapper = element}>
                 {
                <MultipleSelectLabel
                    selectedItems={this.selectedItems}
                    onToggle={this.onToggle}
                    noneSelectedLabel={noneSelectedLabel}
                    maxDisplayItemCount={maxDisplayItemCount} />
                 }
                <div className="multiple-select-default multiple-select-options-container"
                style={{ display: this.state.showOptionList ? "block" : "none" }}>
                    {this._renderSearchBox()}
                        {this._renderOptionAll()}
                    <MultipleSelectOptionList id={this.id}
                        dataSource={this.state.dataSource}
                        onChange={this.onChangeHandler} />
                </div>
            </div>
        )
    }
}