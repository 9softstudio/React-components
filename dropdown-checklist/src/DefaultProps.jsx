export const DropdownCheckListDefaultProps = {
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