import React from 'react'
import RowLayout from '../RowLayout'
import renderer from 'react-test-renderer'

describe('RowLayout ', () => {
    afterAll(() => {
        jest.resetAllMocks();
    })

    describe('_getRowLayout', () => {
        it('columnLayout is array of number - props of children should be correct', () => {
            const props = {
                columnLayout: [100, 200]
            }

            const rowLayout = new RowLayout(props);
            const renderedRowLayout = rowLayout._getRowLayout();

            renderedRowLayout.forEach((child, index) => {
                const expectedKey = `cellLayout${index}`;
                const width = props.columnLayout[index];
                const expectedStyle = { width: `${width}px` };

                const keyResult = child.key;
                const styleResult = child.props.style;

                expect(keyResult).toBe(expectedKey);
                expect(styleResult).toEqual(expectedStyle);
            })
        })

        it('columnLayout is array of string - props of children should be correct', () => {
            const props = {
                columnLayout: ['20%', '30%']
            }

            const rowLayout = new RowLayout(props);
            const renderedRowLayout = rowLayout._getRowLayout();

            renderedRowLayout.forEach((child, index) => {
                const expectedKey = `cellLayout${index}`;
                const width = props.columnLayout[index];
                const expectedStyle = { width };

                const keyResult = child.key;
                const styleResult = child.props.style;

                expect(keyResult).toBe(expectedKey);
                expect(styleResult).toEqual(expectedStyle);
            })
        })
    })

    it('rendered content should be match with snapshot', () => {
        const props = {
            columnLayout: [100, 200]
        }

        const rowLayout = renderer.create(<RowLayout {...props} />);

        const result = rowLayout.toJSON();

        expect(result).toMatchSnapshot();
    })
})