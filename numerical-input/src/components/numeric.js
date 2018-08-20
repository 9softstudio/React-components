import React from 'react';
import './numeric.css';

const DEFAULT_FORMAT = "decimal";
const FORMATS = {
    "integer": {
        "all": /^(0|-?([1-9]\d*)?)$/,
        "positive": /^(0|[1-9]\d*)$/
    },
    "decimal": {
        "all": /^(0|-0|-?([1-9]\d*)?)([.]\d*)?$/,
        "positive": /^(0|([1-9]\d*)?)([.]\d*)?$/,
    },
    "decimal2Places": {
        "all": "^(0|-0|-?([1-9]\\d*)?)([.][\\d]?[\\d]?)?$",
        "positive": "^(0|([1-9]\\d*)?)([.][\\d]?[\\d]?)?$"
    } 
}

export class Numeric extends React.Component {
    constructor(props){
        super(props);

        let regex = this.getFormat(this.props.format, this.props.positive, this.props.decimalPlaces);
        this.state = {
            regex: regex,
            isValid: regex.test(this.props.value)
        }    
        
        this.callPropOnChange(this.state.isValid, this.props.value);            
        this.handleChange  = this.handleChange.bind(this);
    }   

    componentWillReceiveProps(newProps) {    
        var isValid = this.state.regex.test(newProps.value);
        this.setState({isValid: isValid});        
    }

    handleChange (e){
        if (e.target.value == '' || this.state.regex.test(e.target.value)) {
            this.callPropOnChange(true, e.target.value);            
            this.setState({isValid: true});
        }        
    }   

    callPropOnChange(isValid, value){
        if(this.props.onChange){
            this.props.onChange({
                isValid: isValid,
                value: value
            });
        }
    }
    
    getFormat(format, positive, decimalPlaces){
        if(format && decimalPlaces){
            var places = Array(decimalPlaces).fill('[\\d]?').join('');          
            var type = positive ? "positive" : "all";
            var regexFormat = FORMATS["decimal2Places"][type].replace('[\\d]?[\\d]?', places);
            return new RegExp(regexFormat);
        }
        else if(format){
            var type = positive ? "positive" : "all";
            return FORMATS[format][type];
        }
        else{
            return FORMATS[DEFAULT_FORMAT]["all"];
        }
    }

    render() {        
        return (
            <input 
                title={this.state.isValid ? '' : 'Invalid data'} 
                className={this.state.isValid ? '' : 'invalid'} 
                value={this.props.value} 
                onChange={this.handleChange }></input>
        );
    }
}