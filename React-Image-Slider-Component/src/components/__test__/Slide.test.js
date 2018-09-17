import React from 'react';
import Slide from '../Slide';
import Context from '../../slider-context';

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe('<Slide />', () => {
    test('renders correctly', () => {
        const component = renderer
            .create(
                <Context.Provider value={{onImageClick: jest.fn()}}>
                    <Slide index={2} imageInfo={{ url: "fake-url", text: "fake-text" }} style="fake-object-style" />
                </Context.Provider>
            );
        expect(component.toJSON()).toMatchSnapshot();
    });

    test.skip('click on indicator: onImageClick() should be called with index correctly', () => {
        // arrange
        const index = 999;
        const onImageClick = jest.fn();
        
        const context = <Context.Provider value={({ onImageClick: onImageClick })}></Context.Provider>;
        const wrapper = shallow(<Slide index={index} imageInfo={{ url: "fake-url", text: "fake-text" }}/>, {context});
       
        console.log(wrapper.instance());
        console.log(wrapper.find('div'));
        // action
        wrapper.simulate('click');

        // assert
        expect(onImageClick).toBeCalledWith(index);        
    });
});