import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import MultipleSelect from '../src/index'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount(){
        this._gererateDropdownData();    
    }

    _gererateDropdownData = () => {
        const data = [];
        for(let i = 1; i < 10; i++){
            data.push({
                Id: i,
                Name: Math.random().toString(36).substring(7),
                Checked: true
            });
        }

        this.setState({
            data: data
        })
    }

    render() {
        
        return (
            <div>
                <h1>Multi Select</h1>
                <button onClick={this._gererateDropdownData}>Generate Dropdown Data</button>
                <div style={{width: "400px"}}>
                    <MultipleSelect
                        language='en-US'
                        id="SelectList"
                        dataSource={this.state.data}
                        keyField="Id"
                        valueField="Name"
                        statusField="Checked"
                        texts={{SelectOptions: "Please select", All: "All",  SelectedItemCount: "# selected"}}
                        hasSearchBox={true} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));