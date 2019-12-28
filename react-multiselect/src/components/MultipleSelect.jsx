import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MultipleSelectLabel from './MultipleSelectLabel'
import MultipleSelectOptionList from './MultipleSelectOptionList'
import OptionAll from './OptionAll'
import SearchBox from './SearchBox'

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
        this.searchInputBox = React.createRef();
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
        texts: PropTypes.object
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

        const newDataSource = this.state.dataSource.map(x => {
            if (x.key === item.key) {
                return { ...x, checked: item.checked };
            }

            return x;
        });

        this.setState({ dataSource: newDataSource }, () => this._callBackToParent(selectedItem));
    }
    
    onToggle = () => {
        this.setState((prevState) => { return { showOptionList: !prevState.showOptionList } },
            () => {
                if(this.searchInputBox.current && this.state.showOptionList){
                    this.searchInputBox.current.focus();
                }
            })
    }

    checkAllHandler = (checked) => {
        const newDataSource = this.state.dataSource.map(item => {
            if (item.checked !== checked) {
                return { ...item, checked };
            }

            return item;
        });

        this.setState({
            dataSource: newDataSource
        }, () => {
            this._callBackToParent(null);
        });
    }

    onChangeSearchText = (value) => {
        const newDataSource = this.state.dataSource.map(item => {
            const itemValue = item[VALUE_NAME] && item[VALUE_NAME].toLowerCase();
            const searchingValue = value && value.toLowerCase();
            const isVisible = itemValue.indexOf(searchingValue) !== -1;

            if (item.visible !== isVisible) {
                return {
                    ...item,
                    visible: isVisible
                }
            }

            return item;
        })

        this.setState({ 
            searchText: value,
            dataSource: newDataSource
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

        return <SearchBox
            onChangeSearchText={this.onChangeSearchText}
            value={this.state.searchText}
            onClearSearch={this.onClearSearch}
            ref={this.searchInputBox} />
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