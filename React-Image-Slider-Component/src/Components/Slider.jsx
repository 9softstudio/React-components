import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from '../slider-context';
import { mergeClassName } from '../utils';
import Slide from './Slide';

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

    renderLeftRightArrows() {
        return <React.Fragment>
            {this.getArrow('left', () => this.onLeftArrowClick())}
            {this.getArrow('right', () => this.onRightArrowClick())}
        </React.Fragment>
    }

    renderTopBottomArrows() {
        return <React.Fragment>
            {this.getArrow('top', () => this.onTopArrowClick())}
            {this.getArrow('bottom', () => this.onBottomArrowClick())}    
            </React.Fragment>
    }
 
    getArrow(arrowName, eventClick) {
        return <img src={`img/slider-${arrowName}-arrow.png`} 
                    className={`slider-arrow-position ${arrowName}-arrow`} 
                    onClick={eventClick} 
                    style={this.props.arrowButtonStyle}/>
    }

    componentDidMount() {
        const { autoPlay, transitionTime } = this.props;
        if (autoPlay) {
            const intervalId = setInterval(() => {
                this.increaseCurrentSlideIndex()
            }, transitionTime);
            this.setState({ intervalId: intervalId })
        }
    }

    render() {
        return (<Context.Provider value=
            {({
                currentSlideIndex: this.state.currentSlideIndex,
                onImageClick: (index) => this.onImageClick(index)
            })}>

            <div className={mergeClassName(this.props, 'la-slider')} style={{ width: this.props.width, height: this.props.height }}>
                {this.renderSlides()}
                {this.props.isShowLeftRightArrows && this.renderLeftRightArrows()}
                {this.props.isShowTopBottomArrows && this.renderTopBottomArrows()}
            </div>
        </Context.Provider>);
    }
};

Slider.defaultProps = {
    images: [],
    autoPlay: false,
    transitionTime: 3000,
    isShowLeftRightArrows: false,
    isShowTopBottomArrows: false,
    width: '100%',
    height: '500px'
}

Slider.propTypes = {
    images: PropTypes.array.isRequired,
    autoPlay: PropTypes.bool,
    transitionTime: PropTypes.number,
    isShowLeftRightArrows: PropTypes.bool,
    isShowTopBottomArrows: PropTypes.bool,
    width: PropTypes.string,
    height: PropTypes.string,
    arrowButtonStyle: PropTypes.object
}