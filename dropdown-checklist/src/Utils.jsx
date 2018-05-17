import * as Constants from './Constants';

export function buildHierarchyCollection(dataSource, flatItems, options) {
    var { parentIdName, idName, displayName, checkedName, selectAll, expandedName, expandAll } = options;

    var collection = [];
    var hashtable = {};
    var newItemData, id;
    var resolveParentMissing = function (_, item) {
        if (item.data[parentIdName] === id) {
            newItemData.items.push(item);
        }
    };

    var parentADNCode = "0.1";

    for (var i = 0; i < dataSource.length; i++) {
        var itemData = dataSource[i];
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
        newItemData[Constants.DATA_KEYNAME] = itemData[Constants.DATA_KEYNAME] = flatItems.length;
        flatItems.push(newItemData);

        // if there is no parent then add to collection as root item
        if (!parentId) {
            collection.push(newItemData);
        }
            // if parent is found, then add to parent's items
        else if (hashtable[parentId]) {
            var parent = hashtable[parentId];
            newItemData.ADNCode = parent.ADNCode + "." + newItemData[Constants.DATA_KEYNAME];
            parent.items.push(newItemData);
        }
    }

    resolveItemLevel(collection, 1);
    return collection;
}

export function normalizeData(dataSource, flatItems, options, level = 1, parentADNCode = "0") {
    var { displayName, checkedName, selectAll, expandedName, expandAll, childName } = options;

    var collection = [];

    for (var i = 0; i < dataSource.length; i++) {
        var itemData = dataSource[i];
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
        newItemData[Constants.DATA_KEYNAME] = itemData[Constants.DATA_KEYNAME] = flatItems.length;

        flatItems.push(newItemData);
        collection.push(newItemData);

        if (itemData[childName]) {
            newItemData.items = normalizeData(itemData[childName], flatItems, options, level + 1, newItemData.ADNCode);
        }
    }

    return collection;
}

export function addRootNode(normalizedData, flatItems, options) {
    var { rootText, selectAll, singleSelect } = options;

    var root = {
        text: rootText,
        items: normalizedData,
        expanded: true,
        level: 0,
        checked: selectAll && !singleSelect,
        data: [],
        ADNCode: "0.1"
    };
    root[Constants.DATA_KEYNAME] = 0;
    flatItems[0] = root;
    return [root];
}

export function autoChecks(data) {
    var isChecked = true;

    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];

        if (dataItem.items.length) {
            dataItem.checked = autoChecks(dataItem.items);
        }

        isChecked = isChecked && dataItem.checked;
    }

    return isChecked;
}

export function findMaxlevel(items) {
    var max = 0;
    for (var i = 0; i < items.length; i++) {
        if (items[i] && max < items[i].level) {
            max = items[i].level;
        }
    }

    return max;
}

export function getSelectedText(options, maxLevel, flatItems) {
    var { selectAllText, noSelectedText, multipleSelectedText, singleSelect } = options;

    var text = "";
    var checkInfo = getCheckInfo(singleSelect, flatItems);
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

    return text;
}

export function getCheckInfo(singleSelect, flatItems) {
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

export function getItemByKey(dataKeyValue, flatItems) {
    return flatItems.find((item) => item && item[Constants.DATA_KEYNAME] == dataKeyValue);
}

function resolveItemLevel(items, level) {
    items.map((item, index) => {
        item.level = level;
        resolveItemLevel(item.items, level + 1);
    });
}