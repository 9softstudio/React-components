import React from 'react';
import Slide from '../Slide';
import Context from '../../slider-context';
import renderer from 'react-test-renderer';

describe('<Slide />', () => {
    test('renders correctly', () => {
        const component = renderer
            .create(
                <Context.Provider value={({ currentSlideIndex: 1 })}>
                    <Slide index={2} imageInfo={{ url: "fake-url", text: "fake-text" }} style="fake-object-style" />
                </Context.Provider>
            );
        expect(component.toJSON()).toMatchSnapshot();
    });
});