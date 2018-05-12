import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Header from './Header';
import Filter from './Filter';

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
        if (this.dropdownCheckList.contains(e.target)){ 
            return;
        }

        this.setState({
            listVisible: false,
            opened: false
        });
        document.removeEventListener("click", this.handleOutsideClick);
    }


    showDropdown = () => {
        var { showFilter, height, cssClass, width, mode, dropdownName, filterDelay } = this.props;
        var { normalizedData } = this.state;


        width = width ? width : this.dropdownElement.offsetWidth;
        var scrollerElement = <div className={height ? "fdcl__scroller" : ""} style={{ height: height, width: width }} ref={dropdownScroller => { this.dropdownScroller = dropdownScroller }}>
            {this.createListElement(normalizedData)}
        </div>;

        return <div className={cssClass + " fdcl__dropdown"}>
            {showFilter ? <Filter width={width} onFilterChange={this.onFilterChange} filterDelay={filterDelay} /> : ""}
            {scrollerElement}
        </div>
    }

    static propTypes = {
        dropdownName: PropTypes.string.isRequired,
        dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
        isActive: PropTypes.bool,
        selectAll: PropTypes.bool,
        selectAllText: PropTypes.string,
        expandAll: PropTypes.bool,
        noSelectedText: PropTypes.string,
        rootText: PropTypes.string,
        filterText: PropTypes.string,
        multipleSelectedText: PropTypes.string,
        displayName: PropTypes.string,
        childName: PropTypes.string,
        checkedName: PropTypes.string,
        expandedName: PropTypes.string,
        showRoot: PropTypes.bool,
        showFilter: PropTypes.bool,
        height: PropTypes.number,
        width: PropTypes.number,
        filterDelay: PropTypes.number,
        parentIdName: PropTypes.any,
        idName: PropTypes.any,
        singleSelect: PropTypes.any,
        selectableLevel: PropTypes.number,
        cssClass: PropTypes.string,
        mode: PropTypes.string,
        autoCheck: PropTypes.bool,
        countLevel: PropTypes.number
    }

    static defaultProps = {
        // auto select all items when load
        selectAll: true,
        // display text when all items are selected
        selectAllText: "All",
        // auto expand all items when load
        expandAll: false,
        // display text when no item selected
        noSelectedText: "Please select!",
        // display text for root node
        rootText: "All",
        // display text for filter text box
        filterText: "Filter",
        // display text when multiple items are selected
        multipleSelectedText: "{0} item(s) selected",
        // display text field name
        displayName: "text",
        // child collection field name
        childName: "items",
        // selection status field name
        checkedName: "checked",
        // expandation status field name
        expandedName: "expanded",
        // show root node
        showRoot: true,
        // show filter box
        showFilter: true,
        // hight of component, 0 = auto
        height: 0,
        // width of component, 0 = auto
        width: 0,
        // deplay time of typing for filter
        filterDelay: 0.3,
        // when data is not group, use this field to indicate parent id
        parentIdName: false,
        // when data is not group, use this field to indicate item id
        idName: false,
        // only one item is selected at time, this field accept number to indicate what child level will be single selected
        singleSelect: false,
        // indicate what level of item can be checked, all = -1
        selectableLevel: -1,
        // custom css class
        cssClass: "",
        // dropdown/inline mode
        mode: "dropdown",
        // auto check child items when parent is checked
        autoCheck: true,
        // to indicate what level of item to be counted
        countLevel: -1,

        dataKeyName: "$$key$$",
        attributeKeyName: "dc-key",
        pluginName: "dropdownCheckList",
        listItemClassName: "ddcl__item",
        itemCheckClassName: "ddci__check",
        body: document.body
    }

    //#region helpers
    createListElement = (items) => {
        var elements = [];

        for (var i = 0; i < items.length; i++) {
            elements.push(this.createListItemElement(items[i]));
        }

        return <ul className="ddcl">{elements}</ul>;
    }

    createListItemElement = (item) => {
        var { singleSelect, dataKeyName, listItemClassName, dropdownName } = this.props;

        var levelClassName = " level-" + item.level;
        var singleClassName = singleSelect === item.level ? " single " : "";
        var expandedClassName = item.expanded ? " expanded " : "";
        var rootClassName = item[dataKeyName] === 0 ? " root " : "";

        var expandElement;
        var childElements;

        if (item.items && item.items.length > 0) {
            let attributeKey = { 'data-key': item[dataKeyName] }
            expandElement = <div className="ddcl__expand" {...attributeKey} onClick={this.onExpandClick}></div>
            childElements = this.createListElement(item.items);
        }

        return <li ref={itemElement => this[dropdownName + 'itemElement-' + item[dataKeyName]] = itemElement} key={item[dataKeyName]} className={listItemClassName + expandedClassName + singleClassName + rootClassName + levelClassName}>
            {this.createCheckItemElement(item)}
            {expandElement}
            {childElements}
        </li>;
    }

    createCheckItemElement = (item) => {
        var { singleSelect, selectableLevel, itemCheckClassName, dataKeyName } = this.props;

        var inputChild = "";
        if ((!singleSelect || singleSelect <= item.level) &&
            (selectableLevel === -1 || item.level <= selectableLevel)) {

            let inputProps = {
                checked: item.checked,
                onChange: this.onCheckChanged,
                className: itemCheckClassName,
                type: "checkbox",
                value: item[dataKeyName]
            };

            inputChild = <input {...inputProps} />;
        }

        return <label className="ddci">{inputChild}<div className="ddci__text">{item.text}</div></label>;

    }

    onCheckChanged = (e) => {
        var { dataKeyName, singleSelect } = this.props;
        var { flatItems } = this.state;
        var { value, checked } = e.target;

        var itemData = this.getItemByKey(value);
        var toggle = singleSelect ? this.toggleSingleChangeStatus : this.toggleChangeStatus;
        toggle(itemData, checked);
        
        this.updateSelectedText();
        this.setState(
            {
                listVisible: false,
                opened: false
            });
    }

    onExpandClick = (e) => {
        var { dataKeyName } = this.props;
        var { flatItems } = this.state;

        var key = e.target.getAttribute("data-key")

        for (var i = 0; i < flatItems.length; i++)
            if (flatItems[i] && flatItems[i][dataKeyName] == key){
                flatItems[i].expanded = !flatItems[i].expanded;
                break;
            }

        this.setState({ flatItems: flatItems});
    }

    onFilterChange = (value) => {
        this.filter(value);
    }

    // #endregion

    //#region Utilities
    normalizeData = (data, flatItems, level = 1) => {
        var { displayName, checkedName, selectAll, expandedName, expandAll, childName, dataKeyName } = this.props;
        var { flatItems } = this.state;

        var collection = [];

        for (var i = 0; i < data.length; i++) {
            var itemData = data[i];
            var newItemData = {
                items: [],
                data: itemData,
                level: level,
                text: itemData[displayName],
                checked: (itemData[checkedName] || selectAll),
                expanded: (itemData[expandedName] || expandAll)
            };

            // generate key
            newItemData[dataKeyName] = itemData[dataKeyName] = flatItems.length;

            flatItems.push(newItemData);
            collection.push(newItemData);

            if (itemData[childName]) {
                newItemData.items = this.normalizeData(itemData[childName], flatItems, level + 1);
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

        for (var i = 0; i < data.length; i++) {
            var itemData = data[i];
            id = itemData[idName];

            var parentId = itemData[parentIdName];
            newItemData = {
                items: [],
                data: itemData,
                text: itemData[displayName],
                checked: (itemData[checkedName] || selectAll),
                expanded: (itemData[expandedName] || expandAll)
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
            data: []
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
                if(item.level >= maxLevel)
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
            this.showHideAllItems(false);

            // Step3: revise all filters and show tag li( curr && parent)
            for (var j = 0; j < filters.length; j++) {
                item = filters[j];
                itemElement = this.getElementByKey(item[dataKeyName]);
                this.showElements(itemElement);

                this.showElementParents(itemElement, listItemClassName);
            }
        } else {
            // Show all tag li
            this.showHideAllItems(true);
        }
    }

    showHideAllItems = (isShow) => {
        var items = ReactDOM.findDOMNode(this.dropdownScroller).getElementsByClassName(this.props.listItemClassName);
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = isShow ? 'block' : 'none';
        }
    }

    getElementByKey = (dataKeyValue) => {
        return ReactDOM.findDOMNode(this[this.props.dropdownName + 'itemElement-' + dataKeyValue]);
    }

    getItemByKey = (dataKeyValue) => {
        return this.state.flatItems.find((item) => item && item[this.props.dataKeyName] == dataKeyValue);
    } 

    showElementParents = (element, filter) => {
        while ((element = element.parentElement))
            if (element.classList.contains(filter))
                this.showElements(element);
    }

    showElements = (element) => {
        element.style.display = 'block';
    }

    //#region change status for radio button (single select)
    toggleSingleChangeStatus = (itemData, checkedStatus) => {
        var { singleSelect } = this.props;

        //Step 1: uncheck prev checked item (force value false)
        var prevCheckedItem = this.getCheckInfo().selectedItems[0];
        if (checkedStatus && prevCheckedItem ) {
            this.setSingleCheck(prevCheckedItem , false);
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
        var {dataKeyName} = this.props;

        var rootItem = this.state.normalizedData.find((item) => item && item[dataKeyName] == itemData[dataKeyName]);
        var childItems = rootItem ? rootItem.items : [];

        for (var i = 0; i < childItems.length; i++) {
            childItems[i].checked = checkedStatus;
        }
    }

    setParentSingleCheckedStatus = (itemData) => {
        var {dataKeyName} = this.props;
        
        //Step 1: get all parents
    
        //Step 2: loop, (every parent, check exists at least one item checked => toggle checked status)
    }
    //#endregion change status for radio button (single select)

    //#region change status for check box (multiple select)
     toggleChangeStatus = (itemData, checkedStatus) => {
    }

    //#endregion change status for check box (multiple select)

    //#endregion Utilities

    render() {
        var { dropdownName, cssClass } = this.props;
        var { listVisible, selectedTextElement, opened } = this.state;

        return (
            <div ref={el => { this.dropdownCheckList = el }}>
                <Header 
                    dropdownName={dropdownName} 
                    opened={opened} 
                    onClickHandler={this.onClickDropDownHandler} 
                    selectedTextElement={selectedTextElement} 
                    headerRef={el => { this.dropdownElement = el}}/>
                {listVisible ? this.showDropdown() : ""}
            </div>
        );
    }
};