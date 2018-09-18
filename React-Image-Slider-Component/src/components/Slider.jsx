import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from '../slider-context';
import { mergeClassName } from '../utils';
import Slide from './Slide';

const NAV_POSITION = {
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical",
    NONE: "none"
}

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = { currentSlideIndex: 0 };
    }

    renderSlides() {
        const className = this.props.navPosition === NAV_POSITION.VERTICAL ? NAV_POSITION.VERTICAL : NAV_POSITION.HORIZONTAL;
        const visibleImageIndex = this.getVisibleImageIndex();
        return this.props.images.map((image, index) =>
            <Slide key={index} imageInfo={image} index={index}
                className={className + " " + (visibleImageIndex[index] || "")} />);
    }

    onNextButtonClick() {
        this.setState({ currentSlideIndex: this.getNextImageIndex() });
        this.setUpAutoPlay();
    }

    onPreviousButtonClick() {
        this.setState({ currentSlideIndex: this.getPrevImageIndex() });
        this.setUpAutoPlay();
    }

    onImageClick(index) { this.props.onImageClick(index) }

    getPrevImageIndex() {
        const { currentSlideIndex } = this.state;
        return currentSlideIndex === 0 ? this.props.images.length - 1 : currentSlideIndex - 1;
    }

    getNextImageIndex() {
        const { currentSlideIndex } = this.state;
        return currentSlideIndex === this.props.images.length - 1 ? 0 : currentSlideIndex + 1;
    }

    getVisibleImageIndex() {
        return { [this.getPrevImageIndex()]: "previous", [this.state.currentSlideIndex]: "current", [this.getNextImageIndex()]: "next" };
    }

    renderNavPosition() {
        return <React.Fragment>
            {this.getNavButton('previousButton', () => this.onPreviousButtonClick())}
            {this.getNavButton('nextButton', () => this.onNextButtonClick())}
        </React.Fragment>
    }

    getNavButton(buttonName, eventClick) {
        const { stylesOfNavPosition, navPosition } = this.props;
        return <svg viewBox="0 0 50 58"
            width={stylesOfNavPosition.width}
            height={stylesOfNavPosition.height}
            className={`nav-position ${navPosition} ${buttonName}`} onClick={eventClick}>
            <polyline fill={stylesOfNavPosition.fillColor}
                stroke={stylesOfNavPosition.stroke}
                strokeWidth={stylesOfNavPosition.strokeWidth}
                points="25 0 50 25 25 50" />
        </svg>
    }

    setUpAutoPlay() {
        const { autoPlay } = this.props;
        if (autoPlay) {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    }

    startAutoPlay() {
        const { transitionTime } = this.props;
        this.autoplayTimerId = setInterval(() => {
            this.setState({ currentSlideIndex: this.getNextImageIndex() });
        }, transitionTime);
    }

    stopAutoPlay() {
        if (this.autoplayTimerId) {
            clearInterval(this.autoplayTimerId);
        }
    }

    componentDidMount() {
        this.setUpAutoPlay();
    }

    render() {
        return (<Context.Provider value=
            {({
                currentSlideIndex: this.state.currentSlideIndex,
                onImageClick: (index) => this.onImageClick(index)
            })}>
            <div className={mergeClassName(this.props, 'la-slider')} style={{ width: this.props.width, height: this.props.height }}>
                <div className="la-slider-wrapper">
                    {this.renderSlides()}
                </div>
                {this.props.navPosition !== NAV_POSITION.NONE && this.renderNavPosition()}
            </div>
        </Context.Provider>);
    }
};

Slider.defaultProps = {
    images: [],
    autoPlay: false,
    transitionTime: 3000,
    navPosition: "none",
    width: '100%',
    height: '500px'
}

Slider.propTypes = {
    images: PropTypes.array.isRequired,
    autoPlay: PropTypes.bool,
    transitionTime: PropTypes.number,
    navPosition: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    stylesOfNavPosition: PropTypes.object,
    onImageClick: PropTypes.func
}