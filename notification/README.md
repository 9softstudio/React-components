NUMERICAL INPUT
=======
## Supported formats
```javascript
[
    "integer": ["all", "positive"]
    "decimal": ["all", "positive", "limited decimal places"]
]
```
## Basic Usage
```javascript
import React from 'react';
import {Notification} from '../src/components/notification'
import './form.scss';

export class Form extends React.Component {
    constructor(props){
        super(props);        

        this.state = {
            isActive: false,
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
        this.setState({isActive: true});
    }   

    hideNotification(){
        this.setState({isActive: false});
    }

    render() {        
        return (
            <div className="exampleDiv">
                <input value={this.state.message} onChange={this.updateMessage}/> 
                <button onClick={this.showNotification}>Show message</button>           
                <Notification 
                            message={this.state.message}  
                            timeout={3000} 
                            isActive={this.state.isActive} 
                            onClose={this.hideNotification}/>
            </div>
        );
    }
}
```