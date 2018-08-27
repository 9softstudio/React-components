import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, mount, configure } from 'enzyme';
import {Notification} from './notification';

configure({adapter: new Adapter()});

describe('when init', () => {
    it('get message from props', () => {
        const onCloseSpy = jest.fn();
        const component = shallow(<Notification message={"ok"} onClose={onCloseSpy} />);
        expect(component.find('.message').text()).toEqual("ok");
    })

    it('call onClose based on timeout', () => {
        jest.useFakeTimers();
        const onCloseSpy = jest.fn();
        const component = mount(<Notification message={"ok"} onClose={onCloseSpy} timeout={3000} />);
        component.setProps({isActive: true});      
        jest.runAllTimers();   
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);        
        expect(onCloseSpy).toHaveBeenCalled();
    })

})

describe('when user click on close icon', () => {
    it('call onClose', () => {
        const onCloseSpy = jest.fn();
        const component = shallow(<Notification message={"ok"} onClose={onCloseSpy} />);
        const event = {target: {}};
        component.find('.close').simulate('click', event);
        expect(onCloseSpy).toHaveBeenCalled();
    })
})