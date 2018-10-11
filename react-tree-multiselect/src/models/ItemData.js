export const CheckState = {
    Unchecked: 0,
    Checked: 1,
    Indeterminate: 2
}

export default class ItemData {
    constructor(index, children = [], value = '', text = '') {
        this.index = index;
        this.checkState = CheckState.Unchecked;
        this.expanded = false;
        this.level = 0;
        this.children = children;
        this.value = value;
        this.text = text;
        this.parent = 0;
    }
}