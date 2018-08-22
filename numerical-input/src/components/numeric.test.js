import React from 'react';
import {Numeric} from './numeric';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('When init', () => {    
    it('when input invalid set state isValid false', () => {
        const component = shallow(<Numeric  format={"integer"} value={"1234.2"}/>);
        expect(component.state().isValid).toEqual(false);
    })

    it('when input valid set state isValid true', () => {
        const component = shallow(<Numeric  format={"decimal"} value={"1234.2"}/>);
        expect(component.state().isValid).toEqual(true);
    })

    it('call onchange in constructor if needed', () => {
        const onChangeSpy = jest.fn();
        const component = shallow(<Numeric value={"123"} onChange={onChangeSpy}/>);   
        expect(onChangeSpy).toHaveBeenCalled();
    })   
})

describe('Get right format', () => {     
    it('integer format', () => {
        const component1 = shallow(<Numeric format={"integer"} />);        
        expect(component1.state().regex).toEqual(/^(0|-?([1-9]\d*)?)$/);        
    })

    it('positive integer format', () => {
        const component1 = shallow(<Numeric format={"integer"} positive={true} />);        
        expect(component1.state().regex).toEqual(/^(0|[1-9]\d*)$/);        
    })

    it('decimal format', () => {
        const component1 = shallow(<Numeric format={"decimal"} />);        
        expect(component1.state().regex).toEqual(/^(0|-0|-?([1-9]\d*)?)([.]\d*)?$/);        
    })

    it('positive decimal format', () => {
        const component1 = shallow(<Numeric format={"decimal"} positive={true} />);        
        expect(component1.state().regex).toEqual(/^(0|([1-9]\d*)?)([.]\d*)?$/);        
    })

    it('4 places decimal format', () => {
        const component1 = shallow(<Numeric format={"decimal"} decimalPlaces={4} />);        
        expect(component1.state().regex).toEqual(/^(0|-0|-?([1-9]\d*)?)([.][\d]?[\d]?[\d]?[\d]?)?$/);        
    })

    it('positive 4 places decimal format', () => {
        const component1 = shallow(<Numeric format={"decimal"} decimalPlaces={4} positive={true}/>);        
        expect(component1.state().regex).toEqual(/^(0|([1-9]\d*)?)([.][\d]?[\d]?[\d]?[\d]?)?$/);        
    })

    it('default format is decimal', () => {
        const component = shallow(<Numeric />);
        expect(component.state().regex).toEqual(/^(0|-0|-?([1-9]\d*)?)([.]\d*)?$/);
    })    
})

describe("When input changed", () => {
    it('call onchange of prop when state value changed', () => {
        const onChangeSpy = jest.fn();
        const component = shallow(<Numeric onChange={onChangeSpy}/>);
        const event = {target: {value: "1234"}};
        component.simulate('change', event);
        expect(onChangeSpy).toHaveBeenCalledWith({isValid: true, value: "1234"});
    })
})

describe('Dom attributes', () => {
    it('when valid className is empty', () => {
        const component = shallow(<Numeric value={"123"}/>);   
        expect(component.prop('className')).toEqual('');
    })

    it('when invalid className is invalid', () => {
        const component = shallow(<Numeric format={"integer"} value={"123.1"} />);   
        expect(component.prop('className')).toEqual('invalid');
    })

    it('when valid title is empty', () => {
        const component = shallow(<Numeric value={"123"}/>);
        expect(component.prop('title')).toEqual('');
    })

    it('when invalid title is Invalid data', () => {
        const component = shallow(<Numeric format={"integer"} value={"123.1"} />);   
        expect(component.prop('title')).toEqual('Invalid data');
    })
})

describe('When props change', () => {
    it('when value invalid set state isValid to false', () => {
        const component = shallow(<Numeric format={"integer"} />);   
        component.setProps({value: "123.45"});
        expect(component.state().isValid).toEqual(false);
    })

    it('when value valid set state isValid to true', () => {
        const component = shallow(<Numeric format={"integer"} />);   
        component.setProps({value: "123"});
        expect(component.state().isValid).toEqual(true);
    })    
})