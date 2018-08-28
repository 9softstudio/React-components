import React from 'react';
import LeftArrow from '../LeftArrow';
import Context from '../../../slider-context';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const component = renderer
        .create(
            <Context.Provider value={({ onLeftArrowClick: jest.fn() })}>
                <LeftArrow />
            </Context.Provider>
        );
    expect(component.toJSON()).toMatchSnapshot();
});

test('on click: onLeftArrowClick()', () => {
    const onLeftArrowClick = jest.fn();
    const component = renderer
        .create(
            <Context.Provider value={({ onLeftArrowClick: onLeftArrowClick })}>
                <LeftArrow />
            </Context.Provider>
        );
    expect(component.toJSON().props.onClick).toEqual(onLeftArrowClick);
});