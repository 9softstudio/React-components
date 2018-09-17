import React from 'react';
import Slide from '../Slide';
import Slider from '../Slider';

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });
let images;

describe('renders correctly:', () => {
    beforeEach(() => {
        images = [{ url: "fakeImage1.jpg", text: "fakeImage1" }, { url: "fakeImage2.jpg", text: "fakeImage2" }];
    });

    test('render `Slide` for each item in props.images', () => {
        const wrapper = shallow(<Slider images={images}></Slider>);
        expect(wrapper.find(Slide)).toHaveLength(2);
    });

    test('custom class name', () => {
        const wrapper = shallow(<Slider className='test' images={images}></Slider>);
        expect(wrapper.find('div').first().props().className).toBe('test la-slider');
    });

    test('when navPosition not equals `none`: should be render navigate position', () => {
        const stylesOfNavPosition={width: '50px', height: '50px', stroke: 'blue', strokeWidth: '2px', fillColor: 'red'};
        const component = renderer
                        .create(<Slider stylesOfNavPosition={stylesOfNavPosition} navPosition="dummy-nav-position" images={images}></Slider>);
        expect(component.toJSON()).toMatchSnapshot();
    });
});

describe('default props', () => {
    let wrapper;
    beforeEach(() => {
        images = [{ url: "fakeImage1.jpg", text: "fakeImage1" }, { url: "fakeImage2.jpg", text: "fakeImage2" }];
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

    test('value of navPosition should be none', () => {
        expect(wrapper.instance().props.navPosition).not.toBeUndefined();
        expect(wrapper.instance().props.navPosition).toBe("none");
    });
});

describe('props to context:', () => {
    test('currentSlideIndex should be currentSlideIndex of state', () => {
        const wrapper = shallow(<Slider />);
        expect(wrapper.props().value.currentSlideIndex).toBe(wrapper.state('currentSlideIndex'));
    });
});

describe('onNextButtonClick', () => {
    const component = new Slider();
    beforeEach(() => {
        component.getNextImageIndex = jest.fn();
        component.setUpAutoPlay = jest.fn();
    });

    test('state of currentSlideIndex shouble be updated', () => {
        component.setState = jest.fn();
        const dummyCurrentSlideIndex = 999;
        component.getNextImageIndex.mockReturnValue(dummyCurrentSlideIndex);

        component.onNextButtonClick();

        expect(component.setState).toBeCalledWith({currentSlideIndex : dummyCurrentSlideIndex});
    });

    test('setUpAutoPlay method shouble be called', () => {
        component.onNextButtonClick();

        expect(component.setUpAutoPlay).toBeCalled();
    });
});

describe('onPreviousButtonClick ', () => {
    const component = new Slider();
    beforeEach(() => {
        component.getPrevImageIndex = jest.fn();
        component.setUpAutoPlay = jest.fn();
    });

    test('state of currentSlideIndex shouble be updated', () => {
        component.setState = jest.fn();
        const dummyCurrentSlideIndex = 999;
        component.getPrevImageIndex .mockReturnValue(dummyCurrentSlideIndex);

        component.onPreviousButtonClick();

        expect(component.setState).toBeCalledWith({currentSlideIndex : dummyCurrentSlideIndex});
    });

    test('setUppAutoPlay method shouble be called', () => {
        component.onPreviousButtonClick();

        expect(component.setUpAutoPlay).toBeCalled();
    });
});

describe('getPrevImageIndex ', () => {
    test('when current slide index of state equal zero: return index of last image', () => {
        const images = [{ url: "fakeImage1.jpg", text: "fakeImage1" }, { url: "fakeImage2.jpg", text: "fakeImage2" }, { url: "fakeImage3.jpg", text: "fakeImage3" }];
        const component = new Slider({ images });
        component.state.currentSlideIndex = 0;

        const actual = component.getPrevImageIndex();

        const indexOfLastImage = images.length - 1;
        expect(actual).toBe(indexOfLastImage);
    });

    test('when current slide index of state not equal zero: return current slide index decrease one value', () => {
        const component = new Slider();
        component.state.currentSlideIndex = 2;

        const actual = component.getPrevImageIndex();
        expect(actual).toBe(1);
    });
});

describe('getNextImageIndex ', () => {
    test('when current slide index equal index of last image: return zero', () => {
        const images = [{ url: "fakeImage1.jpg", text: "fakeImage1" }, { url: "fakeImage2.jpg", text: "fakeImage2" }, { url: "fakeImage3.jpg", text: "fakeImage3" }];
        const component = new Slider({ images });
        const indexOfLastImage = images.length - 1;
        component.state.currentSlideIndex = indexOfLastImage;

        const actual = component.getNextImageIndex();

        expect(actual).toBe(0);
    });

    test('when current slide index not equal index of last image: return current slide index increase one value', () => {
        const images = [{ url: "fakeImage1.jpg", text: "fakeImage1" }, { url: "fakeImage2.jpg", text: "fakeImage2" }, { url: "fakeImage3.jpg", text: "fakeImage3" }];
        const component = new Slider({ images });
        component.state.currentSlideIndex = 1;

        const actual = component.getNextImageIndex();

        expect(actual).toBe(2);
    });
});

describe('onImageClick ', () => {
    test('onImageClick method of props should be called with params correctly', () => {
        const images = [{ url: "fakeImage1.jpg", text: "fakeImage1" }, { url: "fakeImage2.jpg", text: "fakeImage2" }, { url: "fakeImage3.jpg", text: "fakeImage3" }];
        const component = new Slider({ images, onImageClick: jest.fn() });

        component.onImageClick(1);
        expect(component.props.onImageClick).toBeCalledWith(1);

        component.onImageClick(999);
        expect(component.props.onImageClick).toBeCalledWith(999);
    });
});

describe('setUpAutoPlay when autoPlay of props is true', () => {
    const component = new Slider({autoPlay: true});
    beforeEach(() => {
        component.stopAutoPlay = jest.fn();
        component.startAutoPlay = jest.fn();
    });

    test('stopAutoPlay method should be called', () => {
         // action
        component.setUpAutoPlay();
        
        // assert
        expect(component.stopAutoPlay).toBeCalled();
    });

    test('startAutoPlay method should be called', () => {
        // action
        component.setUpAutoPlay();

        // assert
        expect(component.startAutoPlay).toBeCalled();
    });

    test('should call function in order', () => { 
        // arrange
        let excutionOrders = [];
        component.stopAutoPlay = jest.fn(() => excutionOrders.push(1));
        component.startAutoPlay = jest.fn(() => excutionOrders.push(2));

        // action
        component.setUpAutoPlay();
        
        // assert
        expect( excutionOrders ).toEqual([1, 2]);
    });
});

describe('startAutoPlay', () => {
    jest.useFakeTimers();

    test('should update currentSlideIndex every milliseconds setting by transitionTime', () => {
        // arrange
        const component = new Slider({ autoPlay: true, transitionTime: 2000 });
        component.setState = jest.fn();

        // action
        component.startAutoPlay();

        // assert
        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 2000);
    });

    test('should update autoplayTimerId ', () => {
        // arrange
        const component = new Slider({ autoPlay: true });
        component.setState = jest.fn();

        // action
        component.startAutoPlay();

        // assert
        expect(component.autoplayTimerId).toBe(2);
    });
});

describe('stopAutoPlay', () => {
    test('when autoplayTimerId is not undefined: clearInterval method should be called with params correctly', () => {
        // arrange
        jest.useFakeTimers();
        const component = new Slider();
        component.autoplayTimerId = 999;

         // action
        component.stopAutoPlay();

        // assert
        expect(clearInterval).toHaveBeenCalledTimes(1);
        expect(clearInterval).toHaveBeenLastCalledWith(999);
    });

    test('when autoplayTimerId is undefined: do not call clearInterval method', () => {
        // arrange
        const component = new Slider();
        component.autoplayTimerId = undefined;

        // action
        component.stopAutoPlay();

        // assert
        expect(clearInterval).not.toBeCalledWith(undefined);
    });
});

describe('componentDidMount when autoPlay of props is true', () => {
    test('setUpAutoPlay method should be called', () => {
        // arrange
        const component = new Slider({ autoPlay: true });
        component.setUpAutoPlay = jest.fn();

         // action
        component.componentDidMount();

        // assert
        expect(component.setUpAutoPlay).toBeCalled();
    });
});