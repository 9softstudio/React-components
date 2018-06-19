import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tab extends Component {
    constructor(props) {
        super(props);

    }

    static propTypes = {
        isActive: PropTypes.bool,
        label: PropTypes.string,
        url: PropTypes.string
    }

    static defaultProps = {
        isActive: false,
        label: "",
        url: "javascript:;"
    }

    render() {
        return (
            <li className="tab">
                <a className={this.props.isActive ? "active" : ""} href={this.props.url} onClick={this.props.onClick}>{this.props.label}</a>
            </li>
        );
    }
};