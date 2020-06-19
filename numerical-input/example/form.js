import React,{useState} from 'react';
import {Numeric} from '../src/components/numeric';
import './form.css';

export class Form extends React.Component {


    const [input1,setInput1] = useState(-12)
    const [input2,setInput2] = useState(-12)
    const [input3,setInput3] = useState(-0.1234)
    const [input4,setInput4] = useState(0.1234)
    const [input5,setInput5] = useState(10.2311)

    const handleInputChange1 = function(data){
        setInput1(data.value)
    }
    const handleInputChange2 = function(data){
        setInput2(data.value)
    }
    const handleInputChange3 = function(data){
        setInput3(data.value)
    }
    const handleInputChange4 = function(data){
        setInput4(data.value)
    }
    const handleInputChange5 = function(data){
        setInput5(data.value)
    }

    const increaseInputs = function(){
        setInput1(input1+1)
        setInput2(input2+1)
        setInput3(input3+1)
        setInput4(input4+1)
        setInput5(input5+1)
    }

    const decreaseInputs = function(){
        setInput1(input1-1)
        setInput2(input2-1)
        setInput3(input3-1)
        setInput4(input4-1)
        setInput5(input5-1)
    }
    // constructor(props){
    //     super(props);        

    //     this.state = {
    //         input1: -12,
    //         input2: -12,
    //         input3: -0.1234,
    //         input4: 0.1234,
    //         input5: 10.2311
    //     }

    //     this.handleInputChange1 = this.handleInputChange1.bind(this);        
    //     this.handleInputChange2 = this.handleInputChange2.bind(this);
    //     this.handleInputChange3 = this.handleInputChange3.bind(this);
    //     this.handleInputChange4 = this.handleInputChange4.bind(this);
    //     this.handleInputChange5 = this.handleInputChange5.bind(this);
    //     this.increaseInputs = this.increaseInputs.bind(this);
    //     this.decreaseInputs = this.decreaseInputs.bind(this);
    // }   

    // handleInputChange1(data){
    //     this.setState({input1: data.value});
    // }   

    // handleInputChange2(data){
    //     this.setState({input2: data.value});
    // }

    // handleInputChange3(data){
    //     this.setState({input3: data.value});
    // }

    // handleInputChange4(data){
    //     this.setState({input4: data.value});
    // }

    // handleInputChange5(data){
    //     this.setState({input5: data.value});
    // }

    // increaseInputs(){
    //     this.setState({input1: this.state.input1 + 1});
    //     this.setState({input2: this.state.input2 + 1});
    //     this.setState({input3: this.state.input3 + 1});
    //     this.setState({input4: this.state.input4 + 1});
    //     this.setState({input5: this.state.input5 + 1});
    // }

    // decreaseInputs(){
    //     this.setState({input1: this.state.input1 - 1});
    //     this.setState({input2: this.state.input2 - 1});
    //     this.setState({input3: this.state.input3 - 1});
    //     this.setState({input4: this.state.input4 - 1});
    //     this.setState({input5: this.state.input5 - 1});
    // }

      
    return (
        <div>
        <form >
            <div>
                <div>Integer </div>
                <Numeric className={"greenBorder"} format={"integer"} value={input1} onChange= {handleInputChange1()}/>
                <label> Value: {input1}</label>
            </div>                
            <br />
            <div>
                <div>Positive Integer </div>
                <Numeric format={"integer"} positive={true} value={input2} onChange={handleInputChange2()}/>
                <label> Value: {input2}</label>
            </div>
            <br />      
            <div>
                <div>Decimal </div>
                <Numeric format={"decimal"} value={input3} onChange={handleInputChange3}/>
                <label> Value: {input3}</label>
            </div>
            <br />      
            <div>
                <div>Positive Decimal </div>
                <Numeric format={"decimal"} positive={true} value={input4} onChange={handleInputChange4}/>
                <label> Value: {input4}</label>
            </div>
            <br />      
            <div>
                <div>Decimal with 4 places </div>
                <Numeric format={"decimal"}  positive={true}  decimalPlaces={4} value={input5} onChange={handleInputChange5}/>
                <label> Value: {input5}</label>
            </div>      
        </form>
        <br /> 
        <button onClick={increaseInputs()}>Increase</button>           
        <button onClick={decreaseInputs()}>Decrease</button>                
        </div>
    );
  
}