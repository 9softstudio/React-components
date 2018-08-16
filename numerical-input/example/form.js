import React from 'react';
import {Numeric} from '../src/components/numeric';

export class Form extends React.Component {
    constructor(props){
        super(props);        

        this.state = {
            input1: -123,
            input2: 123,
            input3: -0.1234,
            input4: 0.1234,
            input5: 10.23
        }

        this.handleInputChange1 = this.handleInputChange1.bind(this);
        this.handleInputChange2 = this.handleInputChange2.bind(this);
        this.handleInputChange3 = this.handleInputChange3.bind(this);
        this.handleInputChange4 = this.handleInputChange4.bind(this);
        this.handleInputChange5 = this.handleInputChange5.bind(this);
    }   

    handleInputChange1(value){
        this.setState({input1: value});
    }

    handleInputChange2(value){
        this.setState({input2: value});
    }

    handleInputChange3(value){
        this.setState({input3: value});
    }

    handleInputChange4(value){
        this.setState({input4: value});
    }

    handleInputChange5(value){
        this.setState({input5: value});
    }

    render() {        
        return (
            <form >
                <div>
                    <div>Integer </div>
                    <Numeric format={"integer"} value={this.state.input1} onChange={this.handleInputChange1}/>
                    <label> Value: {this.state.input1}</label>
                </div>                
                <br />
                <div>
                    <div>Positive Integer </div>
                    <Numeric format={"positive_integer"} value={this.state.input2} onChange={this.handleInputChange2}/>
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
                    <Numeric format={"positive_decimal"} value={this.state.input4} onChange={this.handleInputChange4}/>
                    <label> Value: {this.state.input4}</label>
                </div>
                <br />      
                <div>
                    <div>Decimal with 2 places </div>
                    <Numeric format={"decimal_2places"} value={this.state.input5} onChange={this.handleInputChange5}/>
                    <label> Value: {this.state.input5}</label>
                </div>      
            </form>
        );
    }
}