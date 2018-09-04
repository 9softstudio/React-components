import React from 'react';
import PropTypes from 'prop-types';
import './message-box.scss';

export class MessageBox extends React.Component {
    render() {
        return (
            <div className="laMsgBox laMsgBox-lock">
                <div className="laMsgBox__content">
                    <span className="laMsgBox__close" onClick={this.props.onCancel}>×</span>
                    <div className="laMsgBox__msg">
                        <div className="laMsgBox__caption">{this.props.title}</div>
                        <div className="laMsgBox__confirm">
                            <span className="laMsgBox__confirmMsg">{this.props.message}</span>
                            <div className="laMsgBox__btns">
                                <button type="button" className="laMsgBox__btnYes" onClick={() => this.props.onSelect(true)}>Yes</button>
                                <button type="button" className="laMsgBox__btnNo" onClick={() => this.props.onSelect(false)}>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

MessageBox.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};