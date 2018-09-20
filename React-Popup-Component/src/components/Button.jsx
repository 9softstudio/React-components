import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Button extends Component {
    render() {
        const { text, className, onButtonClick } = this.props;
        return <button className={className} onClick={onButtonClick}>{text}</button>
    }
}

Button.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    onButtonClick: PropTypes.func.isRequired
}
