import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, mount, configure } from 'enzyme';
import {Notification} from './notification';

configure({adapter: new Adapter()});

describe('when init', () => {
    it('when isActive false, has class hidden', () => {
        const onCloseSpy = jest.fn();
        const component = shallow(<Notification message={"ok"} isActive={false} onClose={onCloseSpy} />);
        expect(component.find('.messageBox').hasClass('hidden')).toBe(true);
    })

    it('when isActive false, does not have class hidden', () => {
        const onCloseSpy = jest.fn();
        const component = shallow(<Notification message={"ok"} isActive={true} onClose={onCloseSpy} />);
        expect(component.find('.messageBox').hasClass('hidden')).toBe(false);
    })

    it('get message from props', () => {
        const onCloseSpy = jest.fn();
        const component = shallow(<Notification message={"ok"} isActive={true} onClose={onCloseSpy} />);
        expect(component.find('.message').text()).toEqual("ok");
    })
})

describe('when component did update', () => {    
    it('when isActive true, call onClose based on timeout', () => {
        jest.useFakeTimers();
        const onCloseSpy = jest.fn();
        const component = mount(<Notification message={"ok"} isActive={false} onClose={onCloseSpy} timeout={3000} />);
        component.setProps({isActive: true});      
        jest.runAllTimers();   
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);        
        expect(onCloseSpy).toHaveBeenCalled();
    })

    it('when isActive false, do not call onClose', () => {
        jest.useFakeTimers();
        const onCloseSpy = jest.fn();
        const component = mount(<Notification message={"ok"} isActive={false} onClose={onCloseSpy} timeout={3000} />);
        component.setProps({isActive: false});        
        expect(setTimeout).toHaveBeenCalledTimes(0);
    })
})

describe('when user click on close icon', () => {
    it('call onClose', () => {
        const onCloseSpy = jest.fn();
        const component = shallow(<Notification message={"ok"} isActive={true} onClose={onCloseSpy} />);
        const event = {target: {}};
        component.find('.close').simulate('click', event);
        expect(onCloseSpy).toHaveBeenCalled();
    })
})