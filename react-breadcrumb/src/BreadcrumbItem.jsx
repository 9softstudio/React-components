import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BreadcrumbItem extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        label: PropTypes.string,
        isActive: PropTypes.bool,
        onClick: PropTypes.func
    }

    static defaultProps = {
        label: '',
        isActive: false
    }

    render() {
        const { label, isActive, onClick } = this.props;

        return (
            <a className={`breadcrumb-item ${isActive ? 'active' : ''}`} onClick={onClick} href='javascript:;' >{label}</a>
        );
    }
}