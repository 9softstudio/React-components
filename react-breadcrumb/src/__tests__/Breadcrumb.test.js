import React from 'react'
import Breadcrumb from '../Breadcrumb'
import renderer from 'react-test-renderer'

describe('Breadcrumb', () => {
    const items = [{ label: 'level 1', value: 1 }, { label: 'level 2', value: '2' }];

    describe('render', () => {
        it('active element is first item - render null', () => { 
            const props = { items, value: 1 };

            const breadcrumb = new Breadcrumb(props);

            const result = breadcrumb.render(); 
        
            expect(result).toBeNull(); 
        });

        it('active element is first item - component render correctly', () => {
            const props = { items, value: '2' };

            const component = renderer.create(<Breadcrumb {...props} />); 

            const result = component.toJSON(); 

            expect(result).toMatchSnapshot(); 
        });
    });
    
     describe('onChange', () => {
         it('new value is the same with the current - do nothing', () => {
            const onChangeHandler = jest.fn();
            const props = { items, value: '2', onChange: onChangeHandler };

            const component = renderer.create(<Breadcrumb {...props} />);

            const breadcrumb = component.toJSON();
            const currentActiveItem = breadcrumb.children[1];
            currentActiveItem.props.onClick();
        
            expect(onChangeHandler).not.toHaveBeenCalled(); 
        });

        it('new value is not the same with the current - call onChange function with correct parameter', () => {
            const onChangeHandler = jest.fn();
            const props = { items, value: '2', onChange: onChangeHandler };

            const component = renderer.create(<Breadcrumb {...props} />);

            const breadcrumb = component.toJSON();
            const newActiveItem = breadcrumb.children[0];
            newActiveItem.props.onClick();
        
            expect(onChangeHandler).toHaveBeenCalledWith(items[0]); 
        });
    });
});