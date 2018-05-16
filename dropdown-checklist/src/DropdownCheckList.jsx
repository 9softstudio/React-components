import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DropdownCheckListPropTypes } from './PropTypes';
import { DropdownCheckListDefaultProps } from './DefaultProps';
import Header from './Header';
import Body from './Body';

export default class DropdownCheckList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listVisible: false,
            normalizedData: [],
            opened: false,
            disabled: false,
            flatItems: [null],
            maxLevel: 0,
            selectedTextElement: this.props.selectAllText
        }
    }
    
    static propTypes = DropdownCheckListPropTypes;

    static defaultProps = DropdownCheckListDefaultProps;

    componentWillMount() {
        var { dataSource, idName, parentIdName, countLevel, showRoot, singleSelect, autoCheck, mode } = this.props;
        var { disabled, flatItems } = this.state;

        var normalizedData = (idName && parentIdName)
            ? this.buildHierarchyCollection(dataSource, flatItems)
            : this.normalizeData(dataSource, flatItems);

        var maxLevel = countLevel;

        if (showRoot) {
            normalizedData = this.addRootNode(normalizedData, flatItems);
        }

        if (!singleSelect && autoCheck) {
            this.autoChecks(normalizedData);
        }

        if (maxLevel === -1 && !singleSelect) {
            maxLevel = this.findMaxlevel(flatItems);
        }

        this.updateSelectedText();
        this.setDisableStatus(disabled === true);

        this.setState(
            {
                normalizedData: normalizedData,
                maxLevel: maxLevel
            });

    }

    onClickDropDownHandler = () => {
        this.setState((prevState) => (
            {
                listVisible: !prevState.listVisible,
                opened: !prevState.opened
            }));
        document.addEventListener("click", this.handleOutsideClick);
    }

    handleOutsideClick = (e) => {
        // ignore clicks on the component itself
        if (this.dropdownCheckList.contains(e.target)) {
            return;
        }

        this.setState({
            listVisible: false,
            opened: false
        });
        document.removeEventListener("click", this.handleOutsideClick);
    }

    //#region helpers
    onCheckChanged = (e) => {
        var { dataKeyName, singleSelect } = this.props;
        var { flatItems } = this.state;
        var { value, checked } = e.target;

        var itemData = this.getItemByKey(value);
        var toggle = singleSelect ? this.toggleSingleChangeStatus : this.toggleChangeStatus;
        toggle(itemData, checked);

        this.updateSelectedText();
    }

    onExpandClick = (e) => {
        var { dataKeyName } = this.props;
        var { flatItems } = this.state;

        var key = e.target.getAttribute("data-key")

        for (var i = 0; i < flatItems.length; i++)
            if (flatItems[i] && flatItems[i][dataKeyName] == key) {
                flatItems[i].expanded = !flatItems[i].expanded;
                break;
            }

        this.setState({ flatItems: flatItems });
    }

    onFilterChange = (value) => {
        this.filter(value);
    }

    // #endregion

    //#region Utilities
    normalizeData = (data, flatItems, level = 1, parentADNCode = "0") => {
        var { displayName, checkedName, selectAll, expandedName, expandAll, childName, dataKeyName } = this.props;

        var collection = [];

        for (var i = 0; i < data.length; i++) {
            var itemData = data[i];
            var newItemData = {
                items: [],
                data: itemData,
                level: level,
                text: itemData[displayName],
                checked: (itemData[checkedName] || selectAll),
                expanded: (itemData[expandedName] || expandAll),
                ADNCode: parentADNCode + "." + flatItems.length
            };

            // generate key
            newItemData[dataKeyName] = itemData[dataKeyName] = flatItems.length;

            flatItems.push(newItemData);
            collection.push(newItemData);

            if (itemData[childName]) {
                newItemData.items = this.normalizeData(itemData[childName], flatItems, level + 1, newItemData.ADNCode);
            }
        }

        return collection;
    }

    buildHierarchyCollection = (data, flatItems) => {
        var { parentIdName, idName, displayName, checkedName, selectAll, expandedName, expandAll, dataKeyName } = this.props;

        var collection = [];
        var hashtable = {};
        var newItemData, id;
        var resolveParentMissing = function (_, item) {
            if (item.data[parentIdName] === id) {
                newItemData.items.push(item);
            }
        };
        
        var parentADNCode = "0.1";

        for (var i = 0; i < data.length; i++) {
            var itemData = data[i];
            id = itemData[idName];

            var parentId = itemData[parentIdName];
            newItemData = {
                items: [],
                data: itemData,
                text: itemData[displayName],
                checked: (itemData[checkedName] || selectAll),
                expanded: (itemData[expandedName] || expandAll),
                ADNCode: parentADNCode + "." + flatItems.length
            };

            hashtable[id] = newItemData;

            // generate key
            newItemData[dataKeyName] = itemData[dataKeyName] = flatItems.length;
            flatItems.push(newItemData);

            // if there is no parent then add to collection as root item
            if (!parentId) {
                collection.push(newItemData);
            }
            // if parent is found, then add to parent's items
            else if (hashtable[parentId]) {
                var parent = hashtable[parentId];
                newItemData.ADNCode = parent.ADNCode + "." + newItemData[dataKeyName];
                parent.items.push(newItemData);
            }
        }

        this.resolveItemLevel(collection, 1);
        return collection;
    }

    addRootNode = (normalizedData, flatItems) => {
        var { rootText, selectAll, singleSelect, dataKeyName } = this.props;

        var root = {
            text: rootText,
            items: normalizedData,
            expanded: true,
            level: 0,
            checked: selectAll && !singleSelect,
            data: [],
            ADNCode: "0.1" 
        };
        root[dataKeyName] = 0;
        flatItems[0] = root;
        return [root];
    }

    autoChecks = (data) => {
        var isChecked = true;

        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];

            if (dataItem.items.length) {
                dataItem.checked = this.autoChecks(dataItem.items);
            }

            isChecked = isChecked && dataItem.checked;
        }

        return isChecked;
    }

    findMaxlevel = (items) => {
        var max = 0;
        for (var i = 0; i < items.length; i++) {
            if (items[i] && max < items[i].level) {
                max = items[i].level;
            }
        }

        return max;
    }

    updateSelectedText = () => {
        var { selectAllText, noSelectedText, multipleSelectedText } = this.props;
        var { maxLevel } = this.state;

        var text = "";
        var checkInfo = this.getCheckInfo();
        var selectedItems = checkInfo.selectedItems;
        var selectedCount = selectedItems.length;
        var isSelectAll = checkInfo.total === selectedCount;

        if (isSelectAll) {
            text = selectAllText;
        } else if (!selectedCount) {
            text = noSelectedText;
        } else {
            // only count item at specific level
            selectedItems = selectedItems.filter((item) => {
                if (item.level >= maxLevel)
                    return item;
            });
            selectedCount = selectedItems.length;

            // show item text if less than 3 item selected
            text = (selectedCount < 3)
                ? selectedItems.map((item) => { return item.text; }).join(", ")
                : multipleSelectedText.replace(/\{0\}/g, selectedCount);
        }


        this.setState({
            selectedTextElement: text
        });
    }

    getCheckInfo = () => {
        var { singleSelect } = this.props;
        var { flatItems } = this.state;

        var selectedItems = [];

        for (var i = 1; i < flatItems.length; i++) {
            if (flatItems[i].checked &&
                (!singleSelect || singleSelect === flatItems[i].level)) {
                selectedItems.push(flatItems[i]);

                if (singleSelect) {
                    break;
                }
            }
        }

        return {
            total: flatItems.length - 1,
            selectedItems: selectedItems
        };
    }

    setDisableStatus = (isDisabled) => {
        this.setState({
            disabled: isDisabled
        });
    }

    resolveItemLevel = (items, level) => {
        items.map((item, index) => {
            item.level = level;
            this.resolveItemLevel(item.items, level + 1);
        });
    }

    filter = (value) => {
        var { listItemClassName, dataKeyName } = this.props;
        var { flatItems } = this.state;

        var filters = [];
        var itemElement;
        var item;
        var i;
        var itemFilter = "." + listItemClassName;

        if (value) {
            value = value.toLowerCase();

            // Step1: Push items, which contains filtered by text
            filters = flatItems.filter((item) => {
                return item && item.text.toLowerCase().indexOf(value) >= 0;
            });

            console.log(filters);

            // Step2: Hide all tag li

            // Step3: revise all filters and show tag li( curr && parent)
        } else {
            // Show all tag li
            this.showHideAllItems(true);
        }
    }

    getElementByKey = (dataKeyValue) => {
        return ReactDOM.findDOMNode(this[this.props.dropdownName + 'itemElement-' + dataKeyValue]);
    }

    getItemByKey = (dataKeyValue) => {
        return this.state.flatItems.find((item) => item && item[this.props.dataKeyName] == dataKeyValue);
    }

    //#region change status for radio button (single select)
    toggleSingleChangeStatus = (itemData, checkedStatus) => {
        var { singleSelect } = this.props;

        //Step 1: uncheck prev checked item (force value false)
        var prevCheckedItem = this.getCheckInfo().selectedItems[0];
        var currItemIschildrenOfPrevItem = prevCheckedItem && itemData.ADNCode.indexOf(prevCheckedItem.ADNCode + ".") != -1; 
        if (checkedStatus && prevCheckedItem && !currItemIschildrenOfPrevItem) {
            this.setSingleCheck(prevCheckedItem, false);
        }

        /* Step 2.1: Equals level ->  setSingleCheck (force value true) */
        if (itemData.level === singleSelect) {
            this.setSingleCheck(itemData, true);
        } /* Step 2.2: Is not Equals level -> itself, its childrens, its parents */
        else {
            itemData.checked = checkedStatus;
            this.setChildrenCheckedStatus(itemData, checkedStatus);
            this.setParentSingleCheckedStatus(itemData);
        }
    }

    setSingleCheck = (itemData, checkedStatus) => {
        itemData.checked = checkedStatus;
        this.setChildrenCheckedStatus(itemData, checkedStatus);
    }

    setChildrenCheckedStatus = (itemData, checkedStatus) => {
        var { dataKeyName } = this.props;
        var { flatItems } = this.state;

        var parent = flatItems.find((item) => item && item[dataKeyName] == itemData[dataKeyName]);
        var childItems = flatItems.filter((item) => item && item.ADNCode.indexOf(parent.ADNCode + ".") != -1 );

        for (var i = 0; i < childItems.length; i++) {
            childItems[i].checked = checkedStatus;
        }
    }

    setParentSingleCheckedStatus = (itemData) => {
        var { flatItems } = this.state;

        //Step 1: get all parents
        var parentListItems = this.getAllParentListItems(itemData);

        //Step 2: loop, (every parent, check exists at least one item checked => toggle checked status)
        while (parentListItems.length > 0) {
            var parentElement = parentListItems.shift();
            var checkedItem = flatItems.find((item) => item && item.ADNCode.indexOf(parentElement.ADNCode + ".") != -1 && item.checked);

            parentElement.checked = !!checkedItem;

            if (checkedItem) {
                break;
            }
        }

        for (var i = 0; i < parentListItems.length; i++) {
            parentListItems[i].checked = true;
        }
    }
    
    //#endregion change status for radio button (single select)

    //#region change status for check box (multiple select)
    toggleChangeStatus = (itemData, checkedStatus) => {
        itemData.checked = checkedStatus;
        this.setChildrenCheckedStatus(itemData, checkedStatus);
        this.setParentCheckedStatus(itemData, checkedStatus);
    }

    setParentCheckedStatus = (itemData, checkedStatus) => {
        var { flatItems } = this.state;
       
        //Step 1: get all parents
        var parentListItems = this.getAllParentListItems(itemData);
       
        //Step 2: loop, (every parent, check exists at least one item checked => toggle checked status)
        while (checkedStatus && parentListItems.length > 0) {
            var parentElement = parentListItems.shift();
            var checkedItems = flatItems.filter((item) => item && item.ADNCode.indexOf(parentElement.ADNCode + ".") != -1 && item.checked);
            
            if (checkedItems.length == 0) {
                checkedStatus = false;
            } else {
                parentElement.checked = checkedStatus;
            }
        }

        for (var i = 0; i < parentListItems.length; i++) {
            parentListItems[i].checked = false;
        }
    }

    getAllParentListItems = (itemData) =>{
        var { dataKeyName } = this.props;
        var { flatItems } = this.state;

        var childItem = flatItems.find((item) => item && item[dataKeyName] == itemData[dataKeyName]);
        var lastDotPosition = childItem.ADNCode.lastIndexOf(".");
        var ADNCodeToFind = childItem.ADNCode.substring(0, lastDotPosition);
        var existsAtLeastOneParent = true;

        var parentListItems = [];
        while(existsAtLeastOneParent){
            var parent = flatItems.find((item) => item && item.ADNCode == ADNCodeToFind && item.level != 0);
            if(parent){
                parentListItems.push(parent);
                lastDotPosition = parent.ADNCode.lastIndexOf(".");
                ADNCodeToFind = parent.ADNCode.substring(0, lastDotPosition);
            }else{
                existsAtLeastOneParent = false;
            }
        }
        return parentListItems;
    }
    //#endregion change status for check box (multiple select)

    //#endregion Utilities

    render() {
        var { dropdownName } = this.props;
        var { normalizedData, selectedTextElement, opened, listVisible } = this.state;

        return (
            <div ref={el => { this.dropdownCheckList = el }}>
                <Header
                    dropdownName={dropdownName}
                    opened={opened}
                    onClickHandler={this.onClickDropDownHandler}
                    selectedTextElement={selectedTextElement}
                    headerRef={el => { this.dropdownElement = el }} />

                {listVisible ? <Body dropdownElement={el => { this.dropdownElement = el }}
                                     options={this.props}
                                     dropdownElement={this.dropdownElement}
                                     normalizedData={normalizedData} 
                                     onCheckChanged = {this.onCheckChanged}
                                     onExpandClick = {this.onExpandClick}
                                     onFilterChange = {this.onFilterChange}/>
                                     : ""}

            </div>
        );
    }
};