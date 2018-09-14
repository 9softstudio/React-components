import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from '../slider-context';
import { mergeClassName } from '../utils';
import Slide from './Slide';

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = { currentSlideIndex: 0, intervalId: 0, translateX: 0, translateY: 0 };
    }

    renderSlides() {
        const style = { display: this.props.isShowLeftRightArrows ? "inline-block" : "block" };
        return this.props.images.map((image, index) =>
            <Slide key={index} imageInfo={image} style={style} index={index} />);
    }

    onLeftArrowClick() { this.decreaseCurrentSlideIndex(); }

    onRightArrowClick() { this.increaseCurrentSlideIndex(); }

    onTopArrowClick() { this.decreaseCurrentSlideIndex(); }

    onBottomArrowClick() { this.increaseCurrentSlideIndex(); }

    onImageClick(index) { this.props.onImageClick(index) }

    decreaseCurrentSlideIndex() {
        if (this.state.currentSlideIndex === 0) {
            this.setCurrentSlide(this.props.images.length - 1);
        } else {
            this.setCurrentSlide(this.state.currentSlideIndex - 1);
        }
    }

    increaseCurrentSlideIndex() {
        if (this.state.currentSlideIndex === this.props.images.length - 1) {
            this.setCurrentSlide(0);
        } else {
            this.setCurrentSlide(this.state.currentSlideIndex + 1);
        }
    }

    setCurrentSlide(index) {
        const selector = document.querySelector('.slide');
        const { clientWidth, clientHeight } = selector;
        this.setState(
            {
                currentSlideIndex: index,
                translateX: -(clientWidth * index),
                translateY: -(clientHeight * index)
            });
    }

    renderLeftRightArrows() {
        return <React.Fragment>
            {this.getArrow('left', '28 0 0 28 27 50', () => this.onLeftArrowClick())}
            {this.getArrow('right', '25 0 50 25 25 50', () => this.onRightArrowClick())}
        </React.Fragment>
    }

    renderTopBottomArrows() {
        return <React.Fragment>
            {this.getArrow('top', '0 25 25 3 50 25', () => this.onTopArrowClick())}
            {this.getArrow('bottom', '0 30 25 55 50 30', () => this.onBottomArrowClick())}
        </React.Fragment>
    }

    getArrow(arrowName, points, eventClick) {
        const styles = this.props.arrowButtonStyles;
        return <svg viewBox="0 0 50 58" width={styles.width} height={styles.height} className={`slider-arrow-position ${arrowName}-arrow`} onClick={eventClick} >
            <polyline fill={styles.fillColor} stroke={styles.stroke} strokeWidth={styles.strokeWidth} points={points} />
        </svg>
    }

    getStylesOfSliderWrapper() {
        const { isShowLeftRightArrows } = this.props;
        const { translateX, translateY } = this.state;
        return {
            position: "relative",
            height: "100%",
            transform: isShowLeftRightArrows ? `translateX(${translateX}px)` : `translateY(${translateY}px)`,
            transition: "transform 0.8s ease-out 0s"
        };
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
                <div className="la-slider-wrapper" style={this.getStylesOfSliderWrapper()}>
                    {this.renderSlides()}
                </div>
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
    arrowButtonStyle: PropTypes.object,
    onImageClick: PropTypes.func
}