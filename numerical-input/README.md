NUMERICAL INPUT
=======
## Supported formats
```javascript
[
    "integer",
    "positive_integer",
    "decimal",
    "positive_decimal",
    "decimal_2places"
]
```
## Basic Usage
```javascript
import React from 'react';
import {Numeric} from '../src/components/numeric';

export class Form extends React.Component {
    constructor(props){
        super(props);        

        this.state = {
            input: -0.123
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }   

    handleInputChange(value){
        this.setState({input: value});
    }

    render() {        
        return (
            <form >
                <Numeric format={"decimal"} value={this.state.input} onChange={this.handleInputChange}/>
            </form>
        );
    }
}
```