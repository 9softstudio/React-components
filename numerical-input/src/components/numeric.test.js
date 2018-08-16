import React from 'react';
import {Numeric} from './numeric';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('When init:', () => {    
    it('can receive passing value', () => {       
        const component = shallow(<Numeric value={"123"}/>);
        expect(component.state().value).toEqual("123");
    })

    it('get right format', () => {
        const component1 = shallow(<Numeric format={"integer"} />);
        const component2 = shallow(<Numeric format={"positive_integer"}/>);
        const component3 = shallow(<Numeric format={"decimal"}/>);
        const component4 = shallow(<Numeric format={"positive_decimal"}/>);
        const component5 = shallow(<Numeric format={"decimal_2places"}/>);

        expect(component1.state().regex).toEqual(/^(0|-?([1-9]\d*)?)$/);
        expect(component2.state().regex).toEqual(/^(0|[1-9]\d*)$/);
        expect(component3.state().regex).toEqual(/^(0|-0|-?([1-9]\d*)?)([.]\d*)?$/);
        expect(component4.state().regex).toEqual(/^(0|([1-9]\d*)?)([.]\d*)?$/);
        expect(component5.state().regex).toEqual(/^(0|-0|-?([1-9]\d*)?)([.][\d]?[\d]?)?$/);
    })

    it('default format is decimal', () => {
        const component = shallow(<Numeric />);
        expect(component.state().regex).toEqual(/^(0|-0|-?([1-9]\d*)?)([.]\d*)?$/);
    })

    it('call onchange in constructor if needed', () => {
        const onChangeSpy = jest.fn();
        const component = shallow(<Numeric value={"123"} onChange={onChangeSpy}/>);   
        expect(onChangeSpy).toHaveBeenCalled();
    })   
})

describe("When input changed", () => {
    it('do not change state value when input invalid', () => {
        const component = shallow(<Numeric  format={"integer"}/>);
        const event = {target: {value: "1234.2"}};
        component.simulate('change', event);
        expect(component.state().value).toEqual("");
    })

    it('change state value when input valid', () => {
        const component = shallow(<Numeric  format={"decimal"}/>);
        const event = {target: {value: "1234.2"}};
        component.simulate('change', event);
        expect(component.state().value).toEqual("1234.2");
    })

    it('call onchange of prop when state value changed', () => {
        const onChangeSpy = jest.fn();
        const component = shallow(<Numeric onChange={onChangeSpy}/>);
        const event = {target: {value: "1234"}};
        component.simulate('change', event);
        expect(onChangeSpy).toHaveBeenCalledWith("1234");
    })
})