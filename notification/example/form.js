import React from 'react';
import {Notification} from '../src/components/notification'
import './form.scss';

export class Form extends React.Component {
    constructor(props){
        super(props);        

        this.state = {
            isShowedNotifcation: false,
            message: "Hello there!"
        }

        this.updateMessage = this.updateMessage.bind(this);
        this.showNotification = this.showNotification.bind(this);
        this.hideNotification = this.hideNotification.bind(this);
    }   

    updateMessage(e){
        this.setState({
            message: e.target.value
        })
    }

    showNotification(){
        this.setState({isShowedNotifcation: true});
    }   

    hideNotification(){
        this.setState({isShowedNotifcation: false});
    }

    render() {        
        return (
            <div className="exampleDiv">
                <input value={this.state.message} onChange={this.updateMessage}/> 
                <button onClick={this.showNotification}>Show message</button>  
                {
                    this.state.isShowedNotifcation ? 
                        <Notification 
                            message={this.state.message}  
                            timeout={3000} 
                            onClose={this.hideNotification}/>
                        : null
                }                         
            </div>
        );
    }
}