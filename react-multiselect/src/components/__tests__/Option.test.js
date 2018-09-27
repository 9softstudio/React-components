import React from 'react'
import renderer from 'react-test-renderer'

import Option from '../Option'

const defaultProps = {
    itemData: {
        key: "key",
        value: "value",
        checked: true
    },
    id: "itemId",
    onChange: jest.fn()
}

describe('Option ', () => {
    afterAll(() => {
        jest.resetAllMocks();
    })

    describe('onChange', () => {
        const event = {
            stopPropagation: jest.fn()
        }

        it('event.stopPropagation should be called', () => {
            const option = new Option(defaultProps);

            option.onChange(event);

            expect(event.stopPropagation).toHaveBeenCalled();
        })

        it('props.onChange should be called with corect parameter', () => {
            const { key, value, checked } = defaultProps.itemData;
            const expectedItemData = { key, value, checked: !checked }

            const option = new Option(defaultProps);

            option.onChange(event);

            expect(defaultProps.onChange).toHaveBeenCalledWith(expectedItemData);
        })
    })

    it('render - content match with snapshot', () => {
        const option = renderer.create(<Option {...defaultProps} />);

        const result = option.toJSON();

        expect(result).toMatchSnapshot();
    })
})