import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MultipleSelectLabel from './MultipleSelectLabel'
import MultipleSelectOptionList from './MultipleSelectOptionList'
import OptionAll from './OptionAll'

const KEY_NAME = "key";
const VALUE_NAME = "value";
const STATUS_NAME = "checked";

let id = 1;

function convertDataSourceToState({ keyField, valueField, statusField, dataSource }) {
    return dataSource.map(item => {
        return {
            [KEY_NAME]: item[keyField],
            [VALUE_NAME]: item[valueField],
            [STATUS_NAME]: item[statusField],
            visible: true
        }
    })
}

export default class MultipleSelect extends Component {
    constructor(props) {
        super(props);
        this.searchInputBox = null;
        this.id = `multiple-select-${props.id || id++}`;
        
        this.state = {
            originalDataSource: null,
            searchText: '',
            showOptionList: false,
            dataSource: []
        }
    }

    static propTypes = {
        language: PropTypes.string,
        dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
        keyField: PropTypes.string,
        valueField: PropTypes.string,
        statusField: PropTypes.string,
        maxDisplayItemCount: PropTypes.number,
        onChange: PropTypes.func,
        hasAllOption: PropTypes.bool,
        hasSearchBox: PropTypes.bool,
        isAllTextShown: PropTypes.bool,
        texts: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = {
        language: 'en-US',
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

    static getDerivedStateFromProps(props, state) {
        if (props.dataSource !== state.originalDataSource) {
            return {
                originalDataSource: props.dataSource,
                dataSource: convertDataSourceToState(props)
            }
        }

        return null;
    }

    get selectedItems() {
        return this.state.dataSource.filter(item => item.checked);
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
        const dataSource = this.state.dataSource.slice(0);
        dataSource.forEach(item => item.checked = checked);
        this.setState({
            dataSource: dataSource
        }, () => {
            this._callBackToParent(null);
        });
    }

    onChangeSearchText = (value) => {
        this.setState((prevState) => {
            const dataSource = this.state.dataSource.slice(0);
            dataSource.forEach(item => item.visible = item[VALUE_NAME].startsWith(value));
            
            return { 
                searchText: value,
                dataSource: dataSource
            }
        });
    }

    onClearSearch = () => {
        this.onChangeSearchText('');
    }

    _callBackToParent(selectedItem) {
        const selectedItemsKey = this._getSelectedItemKey();
        this.props.onChange && this.props.onChange(selectedItem, selectedItemsKey);
    }

    _getSelectedItemKey() {
        const selectedItemKey = [];
        const dataSource = this.state.dataSource;
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
            const checkedItemCount = this.state.dataSource.filter(x => x.checked).length;
            const checkedAll = checkedItemCount === this.state.dataSource.length;
            return (<OptionAll id={this.id} checked={checkedAll} language={this.props.language} onChange={this.checkAllHandler} />);
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
        const { maxDisplayItemCount } = this.props;
    
        return (
            <div className="multiple-select-container" id={this.id} ref={element => this.wrapper = element}>
                 {
                <MultipleSelectLabel
                    language={this.props.language}
                    selectedItems={this.selectedItems}
                    dataSourceSize={this.state.dataSource.length}
                    onToggle={this.onToggle}
                    texts={this.props.texts}
                    isAllTextShown={this.props.isAllTextShown}
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