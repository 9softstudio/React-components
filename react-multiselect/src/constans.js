export const KEY_NAME = "key";
export const VALUE_NAME = "value";
export const STATUS_NAME = "checked";
export const SUBLIST_NAME = "subList";

export const defaultTreeViewOption = {
    childrenField: SUBLIST_NAME,
    keyField: KEY_NAME,
    valueField: VALUE_NAME,
    statusField: STATUS_NAME,
    indent: 30,
    includeSelectedParentKey: true,
    useOriginalDataSource: false
}