import React from 'react'
import renderer from 'react-test-renderer'

import Tab from '../Tab'
import Tabs from '../Tabs'

const defaultProps = {
    children: [<Tab isActive={false}>Tab 1 Content</Tab>, <Tab isActive={true}>Tab 2 Content</Tab>]
}

describe('constructor', () => {
    it('Initial state should be correct', () => {
        const component = new Tabs(defaultProps);

        expect(component.state).toEqual({tabState: [false, true]});
    });
});

describe('_renderActiveTabContent', () => {
    it('return correct value', () => {
        const component = new Tabs(defaultProps);

        const result = component._renderActiveTabContent();

        expect(result).toEqual("Tab 2 Content");
    });
});

describe('onTabChange()', () => {
    it('change to first tab: state changed correctly', () => {
        const component = new Tabs(defaultProps);
        component.setState = jest.fn();

        component.onTabChange(0);

        expect(component.setState).toHaveBeenCalledWith({tabState: [true, false]});
    });
});

describe('render', () => {
    it('content match with snapshot', () => {
        const element = renderer.create(<Tabs {...defaultProps} />);

        const result = element.toJSON();

        expect(result).toMatchSnapshot();
    })
})