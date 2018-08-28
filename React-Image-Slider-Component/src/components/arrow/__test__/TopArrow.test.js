import React from 'react';
import TopArrow from '../TopArrow';
import Context from '../../../slider-context';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const component = renderer
        .create(
            <Context.Provider value={({ onTopArrowClick: jest.fn() })}>
                <TopArrow />
            </Context.Provider>
        );
    expect(component.toJSON()).toMatchSnapshot();
});

test('on click: onTopArrowClick()', () => {
    const onTopArrowClick = jest.fn();
    const component = renderer
        .create(
            <Context.Provider value={({ onTopArrowClick: onTopArrowClick })}>
                <TopArrow />
            </Context.Provider>
        );
    expect(component.toJSON().props.onClick).toEqual(onTopArrowClick);
});