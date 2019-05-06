import React from 'react';
import Button from '../Button';
import renderer from 'react-test-renderer';

describe('<Button />', () => {
    test('renders correctly', () => {
        const component = renderer
                .create(<Button text="fake-text" className="fake-class-name" onButtonClick={jest.fn()} />);
                
        expect(component.toJSON()).toMatchSnapshot();
    });
});
