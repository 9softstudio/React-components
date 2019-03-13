import React from 'react'
import renderer from 'react-test-renderer'

import { SCROLLBAR_WIDTH, MAX_WIDTH } from '../../constants'
import createTableSection from '../tableSection';

const defaultProps = {
    tableClass: "table",
    width: MAX_WIDTH,
    maxWidth: MAX_WIDTH,
    minWidth: undefined,
    autoWidth: true,
    maxHeight: undefined
}

describe('tableSection ', () => {
    afterAll(() => {
        jest.resetAllMocks();
    })

    describe('containerWidth getter', () => {
        it('autoWidth = true - get maxWidth value', () => {
            const expectedResult = defaultProps.maxWidth;
            const TableSection = createTableSection();

            const instance = new TableSection(defaultProps);

            const result = instance.containerWidth;

            expect(result).toBe(expectedResult);
        })

        it('autoWidth = false - get width value', () => {
            const width = 600,
                autoWidth = false;
            const props = Object.assign({}, defaultProps, { width, autoWidth })
            const expectedResult = width;
            const TableSection = createTableSection();

            const instance = new TableSection(props);
            const result = instance.containerWidth;

            expect(result).toBe(expectedResult);
        })
    })

    describe('containerStyle getter', () => {
        it('maxHeight props has value - contain maxHeight property', () => {
            const maxHeight = 300;
            const props = Object.assign({}, defaultProps, { maxHeight });
            const expectedResult = {
                width: props.maxWidth,
                minWidth: props.minWidth,
                maxHeight
            }

            const TableSection = createTableSection();
            const instance = new TableSection(props);

            const result = instance.containerStyle;

            expect(result).toEqual(expectedResult);
        })

        it('maxHeight props is undefined - do not contain maxHeight property', () => {
            const expectedResult = {
                width: defaultProps.maxWidth,
                minWidth: defaultProps.minWidth
            }

            const TableSection = createTableSection();
            const instance = new TableSection(defaultProps);

            const result = instance.containerStyle;

            expect(result).toEqual(expectedResult);
        })
    })

    describe('tableStyle getter', () => {
        it('minWidth props is undefined - style object should be correct with width = containerWidth - scrollbarWidth', () => {
            const TableSection = createTableSection();
            const instance = new TableSection(defaultProps);

            const expectedResult = { width: instance.containerWidth - SCROLLBAR_WIDTH };

            const result = instance.tableStyle;

            expect(result).toEqual(expectedResult);
        })

        it('minWidth props - style object should be correct with width = containerWidth - scrollbarWidth', () => {
            const TableSection = createTableSection();
            const instance = new TableSection(defaultProps);

            const expectedResult = { width: instance.containerWidth - SCROLLBAR_WIDTH };

            const result = instance.tableStyle;

            expect(result).toEqual(expectedResult);
        })
    })

    describe('render', () => {
        it('isHeader = true - content should render <thead> tag match with snapshot', () => {
            const extendedContainerProps = { isHeader: true };
            const TableSection = createTableSection(extendedContainerProps);
            const component = renderer.create(<TableSection {...defaultProps}><th>Col1</th><th>Col2</th></TableSection>);

            const result = component.toJSON();

            expect(result).toMatchSnapshot();
        })

        it('isHeader = false - content should render <tbody> tag match with snapshot', () => {
            const extendedContainerProps = { isHeader: false };
            const TableSection = createTableSection(extendedContainerProps);
            const component = renderer.create(<TableSection {...defaultProps}><td>Data1</td><td>Data2</td></TableSection>);

            const result = component.toJSON();

            expect(result).toMatchSnapshot();
        })
    })
})