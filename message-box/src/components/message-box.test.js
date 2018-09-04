import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure } from 'enzyme';
import {MessageBox} from './message-box';

configure({adapter: new Adapter()});

describe('when init', () => {
    it('get title from props', () => {
        const onSelectSpy = jest.fn();
        const component = shallow(<MessageBox title={"confirm"} message={"ok?"} onSelect={onSelectSpy} />);
        expect(component.find('.laMsgBox__caption').text()).toEqual("confirm");
    })

    it('get message from props', () => {
        const onSelectSpy = jest.fn();
        const component = shallow(<MessageBox title={"confirm"} message={"ok?"} onSelect={onSelectSpy} />);
        expect(component.find('.laMsgBox__confirmMsg').text()).toEqual("ok?");
    })
})

describe('when users click', () => {
    it('click on "x" icon, call props onCancel', () => {
        const onSelectSpy = jest.fn();
        const onCancelSpy = jest.fn();
        const component = shallow(<MessageBox title={"confirm"} message={"ok?"} onSelect={onSelectSpy} onCancel={onCancelSpy}/>);
        const event = {target: {}};
        component.find('.laMsgBox__close').simulate('click', event);
        expect(onCancelSpy).toHaveBeenCalled();
    })

    it('click on "yes" button, call props onSelect with param true', () => {
        const onSelectSpy = jest.fn();
        const onCancelSpy = jest.fn();
        const component = shallow(<MessageBox title={"confirm"} message={"ok?"} onSelect={onSelectSpy} onCancel={onCancelSpy}/>);
        const event = {target: {}};
        component.find('.laMsgBox__btnYes').simulate('click', event);
        expect(onSelectSpy).toHaveBeenCalledWith(true);
    })

    it('click on "no" button, call props onSelect with param false', () => {
        const onSelectSpy = jest.fn();
        const onCancelSpy = jest.fn();
        const component = shallow(<MessageBox title={"confirm"} message={"ok?"} onSelect={onSelectSpy} onCancel={onCancelSpy}/>);
        const event = {target: {}};
        component.find('.laMsgBox__btnNo').simulate('click', event);
        expect(onSelectSpy).toHaveBeenCalledWith(false);
    })
})