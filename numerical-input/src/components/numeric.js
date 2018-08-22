import React from 'react';
import PropTypes from 'prop-types';
import './numeric.css';

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

    static getDerivedStateFromProps(nextProps, prevState) {        
        var isValid = prevState.regex.test(nextProps.value);
        return {
            isValid: isValid
        };
    }   

    shouldComponentUpdate(nextProps) {
        return (this.props.value !== nextProps.value);
    }    

    handleChange (e){
        if (e.target.value == '' || this.state.regex.test(e.target.value)) {
            this.callPropOnChange(true, e.target.value);            
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
        var type = positive ? "positive" : "all";
        if(decimalPlaces){
            var places = Array(decimalPlaces).fill('[\\d]?').join('');          
            var regexFormat = FORMATS["decimal2Places"][type].replace('[\\d]?[\\d]?', places);
            return new RegExp(regexFormat);
        }
        else {
            return FORMATS[format][type];
        }        
    }

    render() {        
        return (
            <input 
                title={this.state.isValid ? '' : 'Invalid data'} 
                className={(this.props.className ? this.props.className : '')  + (this.state.isValid ? '' : ' invalid')} 
                value={this.props.value} 
                onChange={this.handleChange }></input>
        );
    }
}

Numeric.defaultProps = {
    className: '',
    format: 'decimal',
    positive: false,
    decimalPlaces: null,
    value: ''
};

Numeric.propTypes = {
    className: PropTypes.string,
    format: PropTypes.string,
    positive: PropTypes.bool, 
    decimalPlaces: PropTypes.number,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onChange: PropTypes.func
};