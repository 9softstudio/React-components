import React from 'react'
import renderer from 'react-test-renderer'

import OptionAll from '../OptionAll'

const LABEL = "All";
const DEFAULT_CHECKED = false;

const defaultProps = {
    onChange: undefined,
    id: "optionAll",
    label: LABEL,
    checked: DEFAULT_CHECKED
}

describe('OptionAll ', () => {
    afterAll(() => {
        jest.resetAllMocks();
    })

    it('changeHandler - props.onChange function should be called with correct parameter', () => {
        const onChange = jest.fn();
        const props = Object.assign({}, defaultProps, { onChange });

        const optionAll = new OptionAll(props);
        const checkedItem = {
            key: "key",
            value: "value",
            checked: false
        };

        optionAll.changeHandler(checkedItem);

        expect(props.onChange).toHaveBeenCalledWith(checkedItem.checked);
    })

    it('render - Option component should has correct props', () => {
        const optionAll = new OptionAll(defaultProps);
        const renderedOptionAll = optionAll.render();
        const optionComponent = renderedOptionAll.props.children;

        const expectedId = "optionAll-optionItemAll";
        const expectedItemData = {
            key: 'All',
            value: 'All',
            checked: false
        }

        const result = optionComponent.props;

        expect(result.id).toBe(expectedId);
        expect(result.itemData).toEqual(expectedItemData);
    })
})