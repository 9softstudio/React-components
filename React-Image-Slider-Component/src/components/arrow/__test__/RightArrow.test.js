import React from 'react';
import RightArrow from '../RightArrow';
import Context from '../../../slider-context';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const component = renderer
        .create(
            <Context.Provider value={({ onRightArrowClick: jest.fn() })}>
                <RightArrow />
            </Context.Provider>
        );
    expect(component.toJSON()).toMatchSnapshot();
});

test('on click: onRightArrowClick()', () => {
    const onRightArrowClick = jest.fn();
    const component = renderer
        .create(
            <Context.Provider value={({ onRightArrowClick: onRightArrowClick })}>
                <RightArrow />
            </Context.Provider>
        );
    expect(component.toJSON().props.onClick).toEqual(onRightArrowClick);
});