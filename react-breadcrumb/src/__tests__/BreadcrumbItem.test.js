import React from 'react'
import BreadcrumbItem from '../BreadcrumbItem'
import renderer from 'react-test-renderer'

describe('BreadcrumbItem', () => {
    it('isActive = false - component render correctly', () => { 
        const props = {
            isActive : false
        };

        const component = renderer.create(<BreadcrumbItem {...props} />);

        const result = component.toJSON(); 
        
        expect(result).toMatchSnapshot(); 
    });

    it('isActive = true - component render correctly', () => {
        const props = {
            isActive : true
        };

        const component = renderer.create(<BreadcrumbItem {...props} />); 

        const result = component.toJSON(); 

        expect(result).toMatchSnapshot(); 
    });
})