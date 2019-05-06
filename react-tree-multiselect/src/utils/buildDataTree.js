import ItemData from '../models/ItemData';

const addToParent = (hashmap, item, parentId) => {
    let parent = hashmap[parentId];

    if (!parent) {
        parent = [];
        hashmap[parentId] = parent;
    }

    if (!parent.index) {
        parent.push(item);
    } else {
        parent.children.push(item);
        item.level = parent.level + 1;
    }
}

const updateChildsInfo = (item) => {
    item.children.forEach(c => {
        c.level = item.level + 1;
        c.parent = item.index;

        updateChildsInfo(c);
    });
}

export default (data, idName, displayName, parentIdName, allItems = []) => {
    const hashmap = {};
    const rootNode = new ItemData(0, [], 0, 'Root');

    rootNode.parent = -1;
    allItems.push(rootNode);

    data.forEach(r => {
        const itemId = r[idName];
        const parentId = r[parentIdName];
        const item = new ItemData(allItems.length, hashmap[itemId] || [], itemId, r[displayName]);

        hashmap[itemId] = item;
        allItems.push(item);

        if (parentId) {
            addToParent(hashmap, item, parentId);
        }
        else {
            rootNode.children.push(item);
        }
    });

    updateChildsInfo(rootNode);

    return rootNode;
}