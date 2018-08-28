import React from 'react';
import BottomArrow from '../BottomArrow';
import Context from '../../../slider-context';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const component = renderer
        .create(
            <Context.Provider value={({ onBottomArrowClick: jest.fn() })}>
                <BottomArrow />
            </Context.Provider>
        );
    expect(component.toJSON()).toMatchSnapshot();
});

test('on click: onBottomArrowClick()', () => {
    const onBottomArrowClick = jest.fn();
    const component = renderer
        .create(
            <Context.Provider value={({ onBottomArrowClick: onBottomArrowClick })}>
                <BottomArrow />
            </Context.Provider>
        );
    expect(component.toJSON().props.onClick).toEqual(onBottomArrowClick);
});