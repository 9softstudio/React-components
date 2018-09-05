import React from 'react';
import Slider from '../Slider';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});
let images; 

describe('renders correctly:', () => {
    beforeEach(() => {
        images = [ { url: "fakeImage1.jpg", text: "fakeImage1" }, { url: "fakeImage2.jpg", text: "fakeImage2" }];
      });

    test('render `Slide` for each item in props.images', () => {
        const wrapper = shallow(<Slider images={images}></Slider>);
        expect(wrapper.find('Slide')).toHaveLength(2);
    });

    test('custom class name', () => {
        const wrapper = shallow(<Slider className='test' images={images}></Slider>);
        expect(wrapper.find('div').props().className).toBe('test la-slider');
    });

    const testCases = [
        {
            props: {isShowLeftArrow: true},
            description: 'should be render LeftArrow',
            componentName: 'LeftArrow'
        },
        {
            props: {isShowRightArrow : true},
            description: 'should be render RightArrow',
            componentName: 'RightArrow'
        },
        {
            props: {isShowTopArrow : true},
            description: 'should be render TopArrow',
            componentName: 'TopArrow'
        },
        {
            props: {isShowBottomArrow : true},
            description: 'should be render BottomArrow',
            componentName: 'BottomArrow'
        }
    ];
    testCases.forEach(testcase => {
        test(testcase.description, () => {
            const wrapper = shallow(<Slider {...testcase.props} images={images}></Slider>);
            expect(wrapper.find(testcase.componentName)).toHaveLength(1);
        });
    });
});

describe('default props', () => {
    let wrapper;
    beforeEach(() => {
        images = [ { url: "fakeImage1.jpg", text: "fakeImage1" }, { url: "fakeImage2.jpg", text: "fakeImage2" }];
        wrapper = shallow(<Slider images={images}></Slider>);
      });

    test('autoPlay should be false', () => {
        expect(wrapper.instance().props.autoPlay).not.toBeUndefined();
        expect(wrapper.instance().props.autoPlay).toBeFalsy();
    });

    test('value of transitionTime should be 3000', () => {
        expect(wrapper.instance().props.transitionTime).not.toBeUndefined();
        expect(wrapper.instance().props.transitionTime).toBe(3000);
    });

    test('value of isShowLeftArrow should be false', () => {
        expect(wrapper.instance().props.isShowLeftArrow).not.toBeUndefined();
        expect(wrapper.instance().props.isShowLeftArrow).toBeFalsy();
    });

    test('value of isShowRightArrow should be false', () => {
        expect(wrapper.instance().props.isShowRightArrow).not.toBeUndefined();
        expect(wrapper.instance().props.isShowRightArrow).toBeFalsy();
    });

    test('value of isShowTopArrow should be false', () => {
        expect(wrapper.instance().props.isShowTopArrow).not.toBeUndefined();
        expect(wrapper.instance().props.isShowTopArrow).toBeFalsy();
    });

    test('value of isShowBottomArrow should be false', () => {
        expect(wrapper.instance().props.isShowBottomArrow).not.toBeUndefined();
        expect(wrapper.instance().props.isShowBottomArrow).toBeFalsy();
    });
});

describe('props to context:', () => {
    test('currentSlideIndex should be currentSlideIndex of state', () => {
        const wrapper = shallow(<Slider />);
        expect(wrapper.props().value.currentSlideIndex).toBe(wrapper.state('currentSlideIndex'));
    });
});

describe('arrow methods', () => {
    const component = new Slider(); 
    beforeEach(() => {
        component.decreaseCurrentSlideIndex = jest.fn();
        component.increaseCurrentSlideIndex = jest.fn();
      });

    const testcases = [
        {
            description: 'onLeftArrowClick: decreaseCurrentSlideIndex method shouble be called',
            action: (component) => component.onLeftArrowClick(),
            assert: (component) => expect(component.decreaseCurrentSlideIndex).toBeCalled()
        },
        {
            description: 'onRightArrowClick: increaseCurrentSlideIndex method shouble be called',
            action: (component) => component.onRightArrowClick(),
            assert: (component) => expect(component.increaseCurrentSlideIndex).toBeCalled()
        },
        {
            description: 'onTopArrowClick: decreaseCurrentSlideIndex method shouble be called',
            action: (component) => component.onTopArrowClick(),
            assert: (component) => expect(component.decreaseCurrentSlideIndex).toBeCalled()
        },
        {
            description: 'onBottomArrowClick: increaseCurrentSlideIndex method shouble be called',
            action: (component) => component.onBottomArrowClick(),
            assert: (component) => expect(component.increaseCurrentSlideIndex).toBeCalled()
        }
    ];

    testcases.forEach(testcase => {
        test(testcase.description, () => {
            testcase.action(component);
            testcase.assert(component);
        });
    });
});

describe('trigger method decreaseCurrentSlideIndex ', () => {
    test('when current slide index of state equal zero: it should be update to index of last image', () => {
        const images = [ { url: "fakeImage1.jpg", text: "fakeImage1" }, { url: "fakeImage2.jpg", text: "fakeImage2" }, { url: "fakeImage3.jpg", text: "fakeImage3" }]; 
        const component = new Slider({images}); 
        component.setState = jest.fn();

        component.state.currentSlideIndex = 0;
        component.decreaseCurrentSlideIndex();
        const indexOfLastImage = images.length - 1;
        expect(component.setState).toBeCalledWith({ currentSlideIndex: indexOfLastImage });
    });

    test('when current slide index of state not equal zero: make decrease one value', () => {
        const component = new Slider(); 
        component.setState = jest.fn();

        component.state.currentSlideIndex = 2;
        component.decreaseCurrentSlideIndex();
        expect(component.setState).toBeCalledWith({ currentSlideIndex: 1 });
    });
});

describe('trigger method increaseCurrentSlideIndex ', () => {
    test('when current slide index equal index of last image: it should be update to zero', () => {
        const images = [ { url: "fakeImage1.jpg", text: "fakeImage1" }, { url: "fakeImage2.jpg", text: "fakeImage2" }, { url: "fakeImage3.jpg", text: "fakeImage3" }]; 
        const component = new Slider({images}); 
        component.setState = jest.fn();

        const indexOfLastImage = images.length - 1;
        component.state.currentSlideIndex = indexOfLastImage;
        component.increaseCurrentSlideIndex();
        expect(component.setState).toBeCalledWith({ currentSlideIndex: 0 });
    });

    test('when current slide index not equal index of last image: make increase one value', () => {
        const images = [ { url: "fakeImage1.jpg", text: "fakeImage1" }, { url: "fakeImage2.jpg", text: "fakeImage2" }, { url: "fakeImage3.jpg", text: "fakeImage3" }]; 
        const component = new Slider({images}); 
        component.setState = jest.fn();

        component.state.currentSlideIndex = 1;
        component.increaseCurrentSlideIndex();
        expect(component.setState).toBeCalledWith({ currentSlideIndex: 2 });
    });
});

describe('trigger method onImageClick ', () => {
   
});

describe('trigger method componentDidMount when autoPlay of props is true', () => {
    jest.useFakeTimers();

    test('should update every milliseconds setting by transitionTime', () => {
        const component = new Slider({autoPlay:true, transitionTime:2000});
        component.setState = jest.fn();
        component.componentDidMount();
        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 2000);
    });

    test('should update intervalId ', () => {
        const component = new Slider({autoPlay:true});
        component.setState = jest.fn();
        component.componentDidMount();
        expect(component.setState).toBeCalledWith({intervalId: 2});
    });
});
