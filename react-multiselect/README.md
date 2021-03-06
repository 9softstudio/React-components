react multiselect
=========================
React 16

Supported languages: en-US (default), zh-TW, zh-CN, zh-Hans
## Install
```
npm i @9softstudio/react-multiselect
```
## Screenshot

<img src="https://raw.githubusercontent.com/9softstudio/React-components/master/react-multiselect/screenshots/ReactMultiselect.jpg" />

## Usage
```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import MultipleSelect from '@9softstudio/react-multiselect'

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
                        language='en-US'
                        dataSource={this.data}
                        keyField="Id"
                        valueField="Name"
                        statusField="Checked"
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