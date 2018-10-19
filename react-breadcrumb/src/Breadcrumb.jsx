import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BreadcrumbItem from './BreadcrumbItem';

export default class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        })).isRequired,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        onChange: PropTypes.func
    }

    onChange(item) {
        if (this.props.value === item.value) {
            return;
        }

        this.props.onChange && this.props.onChange(item);
    }

    _renderItem() {
        const { value, items } = this.props;
        let breadcrumbItems = [];

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const isActive = item.value === value;

            breadcrumbItems.push(
                <BreadcrumbItem key={`breadcrumb-item${i}`} isActive={isActive} label={item.label} onClick={this.onChange.bind(this, item)} />
            );

            if (isActive) {
                break;
            }
        }
        
        return breadcrumbItems;
    }

    render() {
        const items = this._renderItem();
        if (items.length === 1) {
            return null;
        }

        return (
            <div className='breadcrumb'>
                {items}
            </div>    
        );
    }
}