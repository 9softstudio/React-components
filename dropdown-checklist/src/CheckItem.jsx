import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Constants from './Constants';

export default class CheckItem extends Component {
    onCheckChanged = (e) => {
        this.props.onCheckChanged(e);
    }

    render() {
        const { item, options} = this.props;
        const { singleSelect, selectableLevel } = options;

        let inputChild = "";
        if ((!singleSelect || singleSelect <= item.level) &&
            (selectableLevel === -1 || item.level <= selectableLevel)) {

            let inputProps = {
                checked: item.checked,
                onChange: this.onCheckChanged,
                className: Constants.ITEMCHECK_CLASSNAME,
                type: "checkbox",
                value: item[Constants.DATA_KEYNAME]
            };

            inputChild = <input {...inputProps} />;
        }
        return (
            <label className="ddci">{inputChild}<div className="ddci__text">{item.text}</div></label>
        );
    }
};