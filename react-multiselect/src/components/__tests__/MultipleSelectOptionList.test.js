import React from 'react'
import renderer from 'react-test-renderer'

import MultipleSelectOptionList from '../MultipleSelectOptionList'

const defaultProps = {
    dataSource: [],
    id: 1
}

describe('MultipleSelectOptionList ', () => {
    afterAll(() => {
        jest.resetAllMocks();
    })

    describe('_renderOptionList', () => {
        it('Option component count should be correct', () => {
            const expectedResult = 2;
            const dataSource = [{
                key: "key1",
                value: "Value 1",
                checked: true
            },
            {
                key: "key2",
                value: "Value 2",
                checked: false
            }
            ];

            const props = Object.assign({}, defaultProps, { dataSource });
            const optionList = new MultipleSelectOptionList(props);

            const result = optionList._renderOptionList();

            expect(result.length).toBe(expectedResult);
        })

        it('props of Option component should be correct', () => {
            const option = {
                key: "key1",
                value: "Value 1",
                checked: true
            };
            const onChangeFunc = jest.fn();

            const expectedResult = {
                id: "1-optionItem-0",
                itemData: option,
                onChange: onChangeFunc
            };

            const dataSource = [option];

            const props = Object.assign({}, defaultProps, { dataSource, onChange: onChangeFunc });
            const optionList = new MultipleSelectOptionList(props);

            const renderedOptionList = optionList._renderOptionList();
            const result = renderedOptionList[0].props;

            expect(result).toEqual(expectedResult);
        })
    })

    it('rendered content should match with snapshot', () => {
        const dataSource = [{
            key: "key1",
            value: "Value 1",
            checked: true
        },
        {
            key: "key2",
            value: "Value 2",
            checked: false
        }
        ];

        const props = Object.assign({}, defaultProps, { dataSource });
        const optionList = renderer.create(<MultipleSelectOptionList {...props} />);

        const result = optionList.toJSON();

        expect(result).toMatchSnapshot();
    })
})