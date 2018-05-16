import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
    onClickHandler = () => {
        this.props.onClickHandler();
    }
    render() {
        var { dropdownName, opened, selectedTextElement, headerRef} = this.props;
        return (
            <div ref={headerRef} 
                id={dropdownName}
                className={"laForm__field fdcl " + (opened ? "opened" : "")}
                onClick={this.onClickHandler}>
                <span className="fdcl__text">{selectedTextElement}</span>
            </div>
        );
    }
};