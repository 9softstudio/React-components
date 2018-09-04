import React from 'react';
import {MessageBox} from '../src/components/message-box';
import './form.scss';

export class Form extends React.Component {
    constructor(props){
        super(props);        

        this.state = {
            isShowedMsg: false,
            title: "Confirm",
            message: "Are you sure you want to update this function?",
            isShowedResult: false,
            result: false
        }

        this.updateTitle = this.updateTitle.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.showMsg = this.showMsg.bind(this);
        this.hideMsg = this.hideMsg.bind(this);
        this.onSelectHandler = this.onSelectHandler.bind(this);
    }   

    updateTitle(e){
        this.setState({
            title: e.target.value
        })
    }

    updateMessage(e){
        this.setState({
            message: e.target.value
        })
    }

    showMsg(){
        this.setState({isShowedMsg: true});
    }   

    hideMsg(){
        this.setState({isShowedMsg: false});
    }

    onSelectHandler(result){
        this.setState({
            result: result,
            isShowedResult: true,
            isShowedMsg: false
        })               
    }

    render() {        
        return (
            <div className="exampleDiv">
                <label>Title</label>: <input value={this.state.title} onChange={this.updateTitle} /><br/><br/>
                <label>Message</label>: <input value={this.state.message} onChange={this.updateMessage}/><br/><br/>
                <button onClick={this.showMsg}>Show Message Box</button><br/><br/>  
                {
                    this.state.isShowedMsg ? 
                        <MessageBox 
                            title={this.state.title} 
                            message={this.state.message} 
                            onCancel={this.hideMsg}
                            onSelect={this.onSelectHandler}/>
                        : null
                }              
                {
                    this.state.isShowedResult ? 
                        <div className={this.state.result ? 'positive' : 'negative'}>
                            Result: <span>{this.state.result.toString()}</span>
                        </div>
                        : null
                }           
            </div>
        );
    }
}