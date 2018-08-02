import React from 'react';
import Header from '../Header';
import Context from '../../panel-context';
import renderer from 'react-test-renderer';

describe('Panel Header is collapsible:', () => {
    test('renders correctly', () => {
        const component = renderer
            .create(
                <Context.Provider value={({ collapsible: true })}>
                    <Header />
                </Context.Provider>
            );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('custom class name', () => {
        const component = renderer
            .create(
                <Context.Provider value={({ collapsible: true })}>
                    <Header className="hello" />
                </Context.Provider>
            );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('has children', () => {
        const component = renderer
            .create(
                <Context.Provider value={({ collapsible: true })}>
                    <Header className="hello">
                        <span>world</span>
                    </Header>
                </Context.Provider>
            );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('click on indicator: onToggleCollapse()', () => {
        const onToggleCollapse = jest.fn();
        const component = renderer
            .create(
                <Context.Provider value={({ collapsible: true, onToggleCollapse: onToggleCollapse })}>
                    <Header className="hello">
                        <span>world</span>
                    </Header>
                </Context.Provider>
            );
        expect(component.toJSON().children[0].props.onClick).toBe(onToggleCollapse);
    });
});

test('Panel Header is not collapsible: hide indicator icon', () => {
    const component = renderer
        .create(
            <Context.Provider value={({ collapsible: false })}>
                <Header className="hello">
                    <span>world</span>
                </Header>
            </Context.Provider>
        );
    expect(component.toJSON()).toMatchSnapshot();
});