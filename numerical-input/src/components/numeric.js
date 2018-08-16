import React from 'react';

const FORMATS = {
    "integer": /^(0|-?([1-9]\d*)?)$/,
    "positive_integer": /^(0|[1-9]\d*)$/,
    "decimal": /^(0|-0|-?([1-9]\d*)?)([.]\d*)?$/,
    "positive_decimal": /^(0|([1-9]\d*)?)([.]\d*)?$/,
    "decimal_2places": /^(0|-0|-?([1-9]\d*)?)([.][\d]?[\d]?)?$/
}
const DEFAULT_FORMAT = "decimal";

export class Numeric extends React.Component {
    constructor(props){
        super(props);

        let regex = FORMATS[this.props.format || DEFAULT_FORMAT];
        let validInput = regex.test(this.props.value);
        this.state = {
            regex: regex,
            value: validInput ? this.props.value : ''
        }
        
        if(validInput &&  this.props.onChange){
            this.props.onChange(this.state.value);
        }

        this.handleChange  = this.handleChange.bind(this);
    }   

    handleChange (e){
        if (e.target.value == '' || this.state.regex.test(e.target.value)) {
            this.setState({value: e.target.value}, () => {
                if(this.props.onChange){
                    this.props.onChange(this.state.value);
                }
            })           
        }
    }

    render() {        
        return (
            <input value={this.state.value} onChange={this.handleChange }>            
            </input>
        );
    }
}