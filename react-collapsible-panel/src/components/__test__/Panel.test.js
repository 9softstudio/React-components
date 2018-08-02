import React from 'react';
import Panel from '../Panel';
import Context from '../../panel-context';
import renderer from 'react-test-renderer';

describe('Panel:', () => {
    test('renders correctly', () => {
        const component = renderer.create(<Panel />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('default collapsed', () => {
        const component = renderer.create(<Panel defaultExpanding={false} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('custom class name', () => {
        const component = renderer.create(<Panel className="test" />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('has children', () => {
        const component = renderer.create(<Panel><span>helloworld</span></Panel>);
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('props to context', () => {
        const component = renderer.create(
            <Panel defaultExpanding={false} collapsible={false}>
                <Context.Consumer>{value => <span contextValue={value} />}</Context.Consumer>
            </Panel>
        );
        expect(component.toJSON().children[0].props.contextValue).toEqual({
            isExpanded: false,
            collapsible: false,
            onToggleCollapse: component.getInstance().onToggleCollapse
        });
    });
});