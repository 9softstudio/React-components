import React from 'react';
import Popup from '../Popup';
import Button from '../Button';

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe('<Popup />', () => {
    let title, content, onCloseClick;
    beforeEach(() => {
        title = "this is title";
        content = "this is content";
        onCloseClick = jest.fn();
    });

    test('renders correctly', () => {
        const component = renderer
                    .create(<Popup title={title} onCloseClick={onCloseClick}>{content}</Popup>);
        
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('custom class name', () => {
        const wrapper = shallow(<Popup className="test" title={title} onCloseClick={onCloseClick}>{content}</Popup>);
        expect(wrapper.find('div').first().props().className).toBe('test laPopup');
    });

    test('custom popup inner class name', () => {
        const wrapper = shallow(<Popup popupInnerClassName="test" title={title} onCloseClick={onCloseClick}>{content}</Popup>);
        expect(wrapper.find('div .laPopup__inner').props().className).toBe('test laPopup__inner');
    });

    test('has provide button array: should render footer with number of buttons accordingly', () => {
        const buttons = [
            <Button text="Cancel" className="fake-class-name" onButtonClick={jest.fn()} />,
            <Button text="Create" className="fake-class-name" onButtonClick={jest.fn()} />
        ];
        const wrapper = shallow(<Popup buttons={buttons} title={title} onCloseClick={onCloseClick}>{content}</Popup>);

        expect(wrapper.find('div').last().props().className).toBe('laPopup__footer');
        expect(wrapper.find(Button)).toHaveLength(2);
    })
});