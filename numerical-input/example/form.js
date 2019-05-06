import React from 'react';
import {Numeric} from '../src/components/numeric';
import './form.css';

export class Form extends React.Component {
    constructor(props){
        super(props);        

        this.state = {
            input1: -12,
            input2: -12,
            input3: -0.1234,
            input4: 0.1234,
            input5: 10.2311
        }

        this.handleInputChange1 = this.handleInputChange1.bind(this);        
        this.handleInputChange2 = this.handleInputChange2.bind(this);
        this.handleInputChange3 = this.handleInputChange3.bind(this);
        this.handleInputChange4 = this.handleInputChange4.bind(this);
        this.handleInputChange5 = this.handleInputChange5.bind(this);
        this.increaseInputs = this.increaseInputs.bind(this);
        this.decreaseInputs = this.decreaseInputs.bind(this);
    }   

    handleInputChange1(data){
        this.setState({input1: data.value});
    }   

    handleInputChange2(data){
        this.setState({input2: data.value});
    }

    handleInputChange3(data){
        this.setState({input3: data.value});
    }

    handleInputChange4(data){
        this.setState({input4: data.value});
    }

    handleInputChange5(data){
        this.setState({input5: data.value});
    }

    increaseInputs(){
        this.setState({input1: this.state.input1 + 1});
        this.setState({input2: this.state.input2 + 1});
        this.setState({input3: this.state.input3 + 1});
        this.setState({input4: this.state.input4 + 1});
        this.setState({input5: this.state.input5 + 1});
    }

    decreaseInputs(){
        this.setState({input1: this.state.input1 - 1});
        this.setState({input2: this.state.input2 - 1});
        this.setState({input3: this.state.input3 - 1});
        this.setState({input4: this.state.input4 - 1});
        this.setState({input5: this.state.input5 - 1});
    }

    render() {        
        return (
            <div>
            <form >
                <div>
                    <div>Integer </div>
                    <Numeric className={"greenBorder"} format={"integer"} value={this.state.input1} onChange={this.handleInputChange1}/>
                    <label> Value: {this.state.input1}</label>
                </div>                
                <br />
                <div>
                    <div>Positive Integer </div>
                    <Numeric format={"integer"} positive={true} value={this.state.input2} onChange={this.handleInputChange2}/>
                    <label> Value: {this.state.input2}</label>
                </div>
                <br />      
                <div>
                    <div>Decimal </div>
                    <Numeric format={"decimal"} value={this.state.input3} onChange={this.handleInputChange3}/>
                    <label> Value: {this.state.input3}</label>
                </div>
                <br />      
                <div>
                    <div>Positive Decimal </div>
                    <Numeric format={"decimal"} positive={true} value={this.state.input4} onChange={this.handleInputChange4}/>
                    <label> Value: {this.state.input4}</label>
                </div>
                <br />      
                <div>
                    <div>Decimal with 4 places </div>
                    <Numeric format={"decimal"}  positive={true}  decimalPlaces={4} value={this.state.input5} onChange={this.handleInputChange5}/>
                    <label> Value: {this.state.input5}</label>
                </div>      
            </form>
            <br /> 
            <button onClick={this.increaseInputs}>Increase</button>           
            <button onClick={this.decreaseInputs}>Decrease</button>                
            </div>
        );
    }
}