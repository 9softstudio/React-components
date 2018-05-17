import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as Utils from './Utils'
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
        var options = this.props;
        var { dataSource, idName, parentIdName, countLevel, showRoot, singleSelect, autoCheck, mode } = options;
        var { disabled, flatItems } = this.state;
        var normalizedData = (idName && parentIdName)
            ? Utils.buildHierarchyCollection(dataSource, flatItems, options)
            : Utils.normalizeData(dataSource, flatItems, options);
        var maxLevel = countLevel;
        if (showRoot) {
            normalizedData = Utils.addRootNode(normalizedData, flatItems, options);
        }
        if (!singleSelect && autoCheck) {
            Utils.autoChecks(normalizedData);
        }
        if (maxLevel === -1 && !singleSelect) {
            maxLevel = Utils.findMaxlevel(flatItems);
        }
        this.updateSelectedText();
        this.setDisableStatus(disabled === true);
        this.setState({
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

        var itemData = Utils.getItemByKey(value, dataKeyName, flatItems);
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

    // #endregion helpers

    //#region Utilities
   
    updateSelectedText = () => {
        this.setState({
            selectedTextElement: Utils.getSelectedText(this.props, this.state.maxLevel, this.state.flatItems)
        });
    }

    
    setDisableStatus = (isDisabled) => {
        this.setState({
            disabled: isDisabled
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

    //#region change status for radio button (single select)
    toggleSingleChangeStatus = (itemData, checkedStatus) => {
        var { singleSelect } = this.props;

        //Step 1: uncheck prev checked item (force value false)
        var prevCheckedItem = Utils.getCheckInfo(singleSelect, this.state.flatItems).selectedItems[0];
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
        var childItems = flatItems.filter((item) => item && item.ADNCode.indexOf(parent.ADNCode + ".") != -1);

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

    getAllParentListItems = (itemData) => {
        var { dataKeyName } = this.props;
        var { flatItems } = this.state;

        var childItem = flatItems.find((item) => item && item[dataKeyName] == itemData[dataKeyName]);
        var lastDotPosition = childItem.ADNCode.lastIndexOf(".");
        var ADNCodeToFind = childItem.ADNCode.substring(0, lastDotPosition);
        var existsAtLeastOneParent = true;

        var parentListItems = [];
        while (existsAtLeastOneParent) {
            var parent = flatItems.find((item) => item && item.ADNCode == ADNCodeToFind && item.level != 0);
            if (parent) {
                parentListItems.push(parent);
                lastDotPosition = parent.ADNCode.lastIndexOf(".");
                ADNCodeToFind = parent.ADNCode.substring(0, lastDotPosition);
            } else {
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
                    onCheckChanged={this.onCheckChanged}
                    onExpandClick={this.onExpandClick}
                    onFilterChange={this.onFilterChange} />
                    : ""}

            </div>
        );
    }
};