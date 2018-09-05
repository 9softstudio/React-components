import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from '../slider-context';
import { mergeClassName } from '../utils';
import Slide from './Slide';
import LeftArrow from './arrow/LeftArrow';
import RightArrow from './arrow/RightArrow';
import TopArrow from './arrow/TopArrow';
import BottomArrow from './arrow/BottomArrow';

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = { currentSlideIndex: 0, intervalId: 0 };
    }

    renderSlides() {
        return this.props.images.map((image, index) => <Slide key={index} imageInfo={image} index={index} />);
    }

    onLeftArrowClick() { this.decreaseCurrentSlideIndex(); }

    onRightArrowClick() { this.increaseCurrentSlideIndex(); }

    onTopArrowClick() { this.decreaseCurrentSlideIndex(); }

    onBottomArrowClick() { this.increaseCurrentSlideIndex(); }

    onImageClick(index) { alert(this.props.images[index].text); }

    decreaseCurrentSlideIndex() {
        if (this.state.currentSlideIndex === 0) {
            this.setCurrentSlideIndex(this.props.images.length - 1);
        } else {
            this.setCurrentSlideIndex(this.state.currentSlideIndex - 1);
        }
    }

    increaseCurrentSlideIndex() {
        if (this.state.currentSlideIndex === this.props.images.length - 1) {
            this.setCurrentSlideIndex(0);
        } else {
            this.setCurrentSlideIndex(this.state.currentSlideIndex + 1);
        }
    }

    setCurrentSlideIndex(index) {
        this.setState({ currentSlideIndex: index });
    }

    componentDidMount() {
        const { autoPlay, transitionTime } = this.props;
        if (autoPlay) {
            var intervalId = setInterval(() => {
                this.increaseCurrentSlideIndex()
            }, transitionTime);
            this.setState({ intervalId: intervalId })
        }
    }

    render() {
        return (<Context.Provider value=
            {({
                currentSlideIndex: this.state.currentSlideIndex,
                onLeftArrowClick: () => this.onLeftArrowClick(),
                onRightArrowClick: () => this.onRightArrowClick(),
                onTopArrowClick: () => this.onTopArrowClick(),
                onBottomArrowClick: () => this.onBottomArrowClick(),
                onImageClick: (index) => this.onImageClick(index)
            })}>

            <div className={mergeClassName(this.props, 'la-slider')}>
                {this.renderSlides()}
                {this.props.isShowLeftArrow && <LeftArrow />}
                {this.props.isShowRightArrow && <RightArrow />}
                {this.props.isShowTopArrow && <TopArrow />}
                {this.props.isShowBottomArrow && <BottomArrow />}
            </div>
        </Context.Provider>);
    }
};

Slider.defaultProps = {
    images: [],
    autoPlay: false,
    transitionTime: 3000,
    isShowLeftArrow: false,
    isShowRightArrow: false,
    isShowTopArrow: false,
    isShowBottomArrow: false
}

Slider.propTypes = {
    images: PropTypes.array.isRequired,
    autoPlay: PropTypes.bool,
    transitionTime: PropTypes.number,
    isShowLeftArrow: PropTypes.bool,
    isShowRightArrow: PropTypes.bool,
    isShowTopArrow: PropTypes.bool,
    isShowBottomArrow: PropTypes.bool
}