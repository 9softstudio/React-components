import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { mergeClassName } from '../utils'

export default class Popup extends Component {
    renderFooter() {
        const buttons = this.props.buttons.map((button, index) => React.cloneElement(button, { key: index }));
        return <div className="laPopup__footer">{buttons}</div>;
    }

    render() {
        const { popupInnerClassName, title, buttons } = this.props;
        return (
            <div className={mergeClassName(this.props, 'laPopup')}>
                <div className={mergeClassName({}, popupInnerClassName, 'laPopup__inner')} >
                    <div className="laPopup__title">{title}</div>
                    <span className="laPopup__close" toggle="close" onClick={this.props.onCloseClick}>×</span>
                    <div className="laPopup__content">{this.props.children}</div>
                    {buttons && buttons.length > 0 && this.renderFooter()}
                </div>
            </div>
        );
    }
}

Popup.propTypes = {
    onCloseClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    buttons: PropTypes.array,
    popupInnerClassName: PropTypes.string
}