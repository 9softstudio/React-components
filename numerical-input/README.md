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
import {Numeric} from '../src/components/numeric';

export class Form extends React.Component {
    constructor(props){
        super(props);        

        this.state = {
            input: -0.123
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }   

    handleInputChange(data){
        this.setState({input: data.value});
    }

    render() {        
        return (
            <form >
                <Numeric format={"decimal"} positive={true}  decimalPlaces={4} value={this.state.input} onChange={this.handleInputChange}/>
            </form>
        );
    }
}
```