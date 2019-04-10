import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import classNames from "classnames"

const wrapperClasses = {
    OVERLAY: "overlay",
    OVERLAY_OPEN: "overlay-open"
}

export default class Overlay extends Component {
    constructor(props) {
        super(props);

        this.containerElement = null;
        this.refHandlers = {
            container: (ref) => { this.containerElement = ref }
        }

        this.state = {
            isOpening: this.props.isOpening
        }
    }

    static propTypes = {
        closeOnOutsideClick: PropTypes.bool,
        isOpening: PropTypes.bool,
        onOpen: PropTypes.func,
        onClose: PropTypes.func
    }

    static defaultProps = {
        closeOnOutsideClick: true,
        isOpening: false
    }

    componentDidUpdate(prevProps, prevState) {
        const { isOpening } = this.props;
        if (isOpening !== prevProps.isOpening) {
            this.setState({ isOpening: isOpening }, () => {
                const { onOpen, onClose } = this.props;
                if (isOpening) {
                    onOpen && onOpen()
                }
                else {
                    onClose && onClose()
                }
            });
        }
    }

    componentDidMount() {
        this._registerEvents();
    }

    componentWillUnmount() {
        this._unRegisterEvents();
    }

    _registerEvents() {
        const { closeOnOutsideClick } = this.props;

        if (closeOnOutsideClick) {
            document.addEventListener('click', this._handleClickOutSide, true);
        }
    }

    _unRegisterEvents = () => {
        const { closeOnOutsideClick } = this.props;

        if (closeOnOutsideClick) {
            document.removeEventListener('click', this._handleClickOutSide, true);
        }
    }

    _handleClickOutSide = (event) => {
        const clickOutside = this.containerElement && !this.containerElement.contains(event.target);

        if (clickOutside && this.state.isOpening) {
            this._close();
        }
    }

    _close() {
        const { onClose } = this.props;
        this.setState({ isOpening: false }, () => onClose && onClose());
    }

    render() {
        const { className, children } = this.props;
        const mergedClassName = classNames(
            wrapperClasses.OVERLAY,
            {
                [wrapperClasses.OVERLAY_OPEN]: this.state.isOpening
            },
            className
        );
        const style = {
            display: this.state.isOpening ? "block" : "none"
        }

        return (
            <div className={mergedClassName} style={style} ref={this.refHandlers.container}>
                {children}
            </div>
        )
    }
}