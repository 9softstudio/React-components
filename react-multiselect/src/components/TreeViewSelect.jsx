import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MultipleSelectLabel from './MultipleSelectLabel';
import MultipleSelectOptionList from './MultipleSelectOptionList';
import OptionAll from './OptionAll';
import SearchBox from './SearchBox';

import { KEY_NAME, VALUE_NAME, STATUS_NAME, defaultTreeViewOption, SUBLIST_NAME } from '../constans';

import { convertDataSourceToState } from '../utils';

let id = 1;

export default class TreeViewSelect extends Component {
    constructor(props) {
        super(props);
        this.searchInputBox = React.createRef();
        this.id = `multiple-select-${props.id || id++}`;

        const dataSource = convertDataSourceToState(this.props);
        this.state = {
            originalDataSource: this.props.dataSource,
            searchText: '',
            showOptionList: false,
            dataSource
        }

        this.indexByKey = this._createIndexByKey(dataSource);
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
        texts: PropTypes.object,
        treeViewOption: PropTypes.shape({
            childrenField: PropTypes.string,
            keyField: PropTypes.string,
            valueField: PropTypes.string,
            statusField: PropTypes.string,
            indent: PropTypes.number,
            includeSelectedParentKey: PropTypes.bool
        })
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

    componentDidUpdate(prevProps, prevState) {
        if (this.props.dataSource !== prevProps.dataSource) {
            const newState = {
                originalDataSource: this.props.dataSource,
                dataSource: convertDataSourceToState(this.props)
            }

            this.setState(newState);
            this.indexByKey = this._createIndexByKey(newState.dataSource);
        }
    }

    _createIndexByKey(dataSource) {
        return dataSource.reduce((result, currentItem, currentIndex) => {
            result[currentItem.key] = currentIndex;

            return result;
        }, {})
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

        const { dataSource } = this.state;
        const newDataSource = [...dataSource];

        const currentItemIndex = this.indexByKey[item.key];
        newDataSource[currentItemIndex] = { ...item };

        const hasParent = !!item.parentKey;
        const children = newDataSource.filter(x => x.parentKey === item.key);
        const hasChildren = children.length > 0;

        if (hasChildren) {
            const updateChildren = (subList) => {
                for (let i = 0; i < subList.length; i++) {
                    const itemChild = subList[i];
                    const childIndex = this.indexByKey[itemChild.key];
                    newDataSource[childIndex] = { ...newDataSource[childIndex], checked: item.checked };

                    const nestedChildren = newDataSource.filter(x => x.parentKey === itemChild.key);
                    if (nestedChildren.length > 0) {
                        updateChildren(nestedChildren);
                    }
                }
            }

            updateChildren(children);
        }

        if (hasParent) {
            const updateParent = (currentItem) => {
                const parentIndex = this.indexByKey[currentItem.parentKey];
                const parentItem = newDataSource[parentIndex];
                if (parentItem.checked && !currentItem.checked) {
                    newDataSource[parentIndex] = { ...parentItem, checked: false };
                }
                else if (!parentItem.checked && currentItem.checked) {
                    const currentChildren = newDataSource.filter(x => x.parentKey === parentItem.key);
                    const isCheckedParent = currentChildren.filter(x => x.checked).length === currentChildren.length;
                    if (isCheckedParent) {
                        newDataSource[parentIndex] = { ...parentItem, checked: true };
                    }
                }

                const newParentItem = newDataSource[parentIndex];
                if (newParentItem.parentKey) {
                    updateParent(newParentItem);
                }
            }

            updateParent(item);
        }
        this.setState({ dataSource: newDataSource }, () => this._callBackToParent(selectedItem));
    }

    onToggle = () => {
        this.setState((prevState) => { return { showOptionList: !prevState.showOptionList } },
            () => {
                if (this.state.showOptionList) {
                    this.searchInputBox.current.focus();
                }
            })
    }

    checkAllHandler = (checked) => {
        const newDataSource = this.state.dataSource.map(item => {
            if(item.checked !== checked){
                return {...item, checked};
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
            const isVisible = item[VALUE_NAME].startsWith(value);

            if (item.visible !== isVisible) {
                return {
                    ...item,
                    visible: item[VALUE_NAME].startsWith(value)
                }
            }

            return item;
        })

        this.setState({
            searchText: value,
            dataSource: newDataSource
        });
    }

    handleCollapse = (newDataSource) => {
        this.setState({ dataSource: newDataSource });
    }

    onClearSearch = () => {
        this.onChangeSearchText('');
    }

    _callBackToParent(selectedItem) {
        const selectedItemsKey = this._getSelectedItemKey();
        this.props.onChange && this.props.onChange(selectedItem, selectedItemsKey);
    }

    _getSelectedItemKey() {
        const { treeViewOption } = this.props;
        const actualTreeViewOption = (treeViewOption && { ...defaultTreeViewOption, ...treeViewOption }) || defaultTreeViewOption;
        const { includeSelectedParentKey } = actualTreeViewOption;

        const selectedItemKey = [];
        const { dataSource } = this.state;
        for (let i = 0; i < dataSource.length; i++) {
            const item = dataSource[i];
            const hasChildren = dataSource.filter(x => x.parentKey === item.key).length > 0;

            if (item.checked && (includeSelectedParentKey || !hasChildren)) {
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

    _renderSearchBox() {
        if (!this.props.hasSearchBox) {
            return null;
        }

        return <SearchBox
            onChangeSearchText={this.onChangeSearchText}
            value={this.state.searchText}
            onClearSearch={this.onClearSearch}
            ref={this.searchInputBox} />
    }

    render() {
        const { maxDisplayItemCount, treeViewOption } = this.props;
        const actualTreeViewOption = (treeViewOption && { ...defaultTreeViewOption, ...treeViewOption }) || { ...defaultTreeViewOption };
        console.log(actualTreeViewOption);

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
                        onChange={this.onChangeHandler}
                        treeViewOption={actualTreeViewOption}
                        onCollapse={this.handleCollapse} />
                </div>
            </div>
        )
    }
}