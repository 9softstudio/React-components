import React from 'react';
import Slide from '../Slide';
import Context from '../../slider-context';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const component = renderer
        .create(
            <Context.Provider value={({ currentSlideIndex: 1 })}>
                <Slide index={2} imageInfo={{ url: "fake-url", text: "fake-text" }} />
            </Context.Provider>
        );
    expect(component.toJSON()).toMatchSnapshot();
});

test('Slide has currentSlideIndex equals index: class name should has active value', () => {
    const dummyIndex = 1;
    const component = renderer
        .create(
            <Context.Provider value={({ currentSlideIndex: dummyIndex })}>
                <Slide index={dummyIndex} imageInfo={{ url: "fake-url", text: "fake-text" }} />
            </Context.Provider>
        );
    expect(component.toJSON()).toMatchSnapshot();
});
