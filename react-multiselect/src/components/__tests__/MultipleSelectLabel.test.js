import React from 'react'
import renderer from 'react-test-renderer'

import MultipleSelectLabel from '../MultipleSelectLabel'

const NO_SELECTED_LABEL = "Select options";
const MAX_SELECTED_ITEM_FOR_DISPLAY = 3;

const defaultSelectedItem = {
    key: "keyDefault",
    value: "valueDefault"
};
const defaultProps = {
    selectedItems: [],
    noneSelectedLabel: NO_SELECTED_LABEL,
    maxDisplayItemCount: MAX_SELECTED_ITEM_FOR_DISPLAY
}

describe('MultipleSelectLabel ', () => {
    afterAll(() => {
        jest.resetAllMocks();
    })

    describe('selectedItemsString', () => {
        it('No item is selected - return "Select options" text', () => {
            const expectedResult = "Select options";
            const label = new MultipleSelectLabel(defaultProps);

            const result = label.selectedItemsString;

            expect(result).toBe(expectedResult);
        })

        it('selectedItemCount >= maxDisplayItemCount - return selected item count text', () => {
            const expectedResult = "3 selected";
            const selectedItems = [defaultSelectedItem, defaultSelectedItem, defaultSelectedItem]

            const props = Object.assign({}, defaultProps, { selectedItems });
            const label = new MultipleSelectLabel(props);

            const result = label.selectedItemsString;

            expect(result).toBe(expectedResult);
        })

        it('has selected item and item count is less than maxDisplayItemCount - return value of selected items with comma separator', () => {
            const expectedResult = "valueDefault, value1";
            const selectedItems = [defaultSelectedItem, { key: "key1", value: "value1" }];

            const props = Object.assign({}, defaultProps, { selectedItems });
            const label = new MultipleSelectLabel(props);

            const result = label.selectedItemsString;

            expect(result).toBe(expectedResult);
        })
    })

    describe('render', () => {
        it('rendered content should match to snap shot', () => {
            const label = renderer.create(<MultipleSelectLabel {...defaultProps} />);

            const result = label.toJSON();

            expect(result).toMatchSnapshot();
        })

        it('click on label - props.onToggle should be called', () => {
            const toggleFunc = jest.fn();
            const props = Object.assign({}, defaultProps, { onToggle: toggleFunc });
            const label = renderer.create(<MultipleSelectLabel {...props} />);

            const renderedContent = label.toJSON();
            renderedContent.props.onClick();

            expect(toggleFunc).toHaveBeenCalled();
        })
    })
})