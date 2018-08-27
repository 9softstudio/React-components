import React from 'react';
import Body from '../Body';
import Context from '../../panel-context';
import renderer from 'react-test-renderer';

describe('Panel Body is expanded:', () => {
    test('renders correctly', () => {
        const component = renderer
            .create(
                <Context.Provider value={({ isExpanded: true })}>
                    <Body />
                </Context.Provider>
            );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('custom class name', () => {
        const component = renderer
            .create(
                <Context.Provider value={({ isExpanded: true })}>
                    <Body className="hello" />
                </Context.Provider>
            );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('has children', () => {
        const component = renderer
            .create(
                <Context.Provider value={({ isExpanded: true })}>
                    <Body className="hello">
                        <span>world</span>
                    </Body>
                </Context.Provider>
            );
        expect(component.toJSON()).toMatchSnapshot();
    });
});

test('Panel Body is collapsed: not render', () => {
    const component = renderer
        .create(
            <Context.Provider value={({ isExpanded: false })}>
                <Body className="hello">
                    <span>world</span>
                </Body>
            </Context.Provider>
        );
    expect(component.toJSON()).toMatchSnapshot();
});