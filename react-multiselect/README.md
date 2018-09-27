react multiselect
=========================
React 16
## Screenshot

<img src="https://raw.githubusercontent.com/9softstudio/React-components/AddReactMultiSelect/react-multiselect/screenshots/ReactMultiselect.jpg" />

## Usage
```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import MultipleSelect from '../src/index'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.data = [];

        for(let i = 1; i < 100; i++){
            this.data.push({
                Id: i,
                Name: "Item " + i,
                Checked: true
            });
        }
    }

    render() {
        return (
            <div>
                <h1>Multi Select</h1>
                <div style={{width: "400px"}}>
                    <MultipleSelect
                        id="SelectList"
                        dataSource={this.data}
                        keyField="Id"
                        valueField="Name"
                        statusField="Checked"
                        optionAllLabel='All'
                        noneSelectedLabel='Select options'
                        hasSearchBox={true} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
```

## License

MIT