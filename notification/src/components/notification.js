import React from 'react';
import PropTypes from 'prop-types';
import './notification.scss';

export class Notification extends React.Component {
    constructor(props){
        super(props);
        setTimeout(() => this.props.onClose(), this.props.timeout);        
    }
   
    render() {
        return (
            <div className="notification">
                <div className="messageBox">
                    <div className="content content-info">
                        <span className="close" onClick={this.props.onClose}>×</span>
                        <div className="message">{this.props.message}</div>
                    </div>
                </div>
            </div>
        )
    }
}

Notification.defaultProps = {
    timeout: 5000,
};

Notification.propTypes = {
   message: PropTypes.string.isRequired,
   timeout: PropTypes.number,
   onClose: PropTypes.func.isRequired
};