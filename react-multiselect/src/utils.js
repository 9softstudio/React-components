import { KEY_NAME, VALUE_NAME, STATUS_NAME, defaultTreeViewOption } from './constans';

export const convertDataSourceToState = ({ keyField, valueField, statusField, dataSource, treeViewOption }, parentKey = null, level = 0) => {
    const actualTreeViewOption = (treeViewOption && {...defaultTreeViewOption, ...treeViewOption }) || {...defaultTreeViewOption };

    const result = [];
    for (let i = 0; i < dataSource.length; i++) {
        const item = dataSource[i];
        const convertedItem = {
            [KEY_NAME]: item[keyField],
            [VALUE_NAME]: item[valueField],
            [STATUS_NAME]: !!item[statusField],
            visible: true,
            level: level,
            parentKey: parentKey
        }
        result.push(convertedItem);

        if (actualTreeViewOption && item[actualTreeViewOption.childrenField]) {
            const children = item[actualTreeViewOption.childrenField];
            const { keyField, valueField, statusField } = actualTreeViewOption;
            const param = {
                keyField,
                valueField,
                statusField,
                dataSource: children,
                treeViewOption: actualTreeViewOption
            };
            const currentLevel = level + 1;
            const itemList = convertDataSourceToState(param, convertedItem[KEY_NAME], currentLevel);
            result.push(...itemList);
        }
    }

    return result;
}