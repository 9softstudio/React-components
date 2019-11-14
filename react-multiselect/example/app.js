import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import MultipleSelect from '../src/index'

const treeViewData = [
    {
        key: 'parent1',
        value: 'parentValue1',
        checked: true,
        subList: [
            {
                key: 'parent1 - child1',
                value: 'parent1 - child1 - Value 1',
                subList: []
            },
            {
                key: 'parent1 - child2',
                value: 'parent1 - child2 - Value 2',
                subList: []
            },
            {
                key: 'parent1 - child3',
                value: 'parent1 - child3 - Value 3',
                subList: []
            }
        ],
    },
    {
        key: 'parent2',
        value: 'parentValue2',
        checked: true,
        subList: [
            {
                key: 'parent2 - child1',
                value: 'parent2 - child1 - Value 1',
                subList: []
            },
            {
                key: 'parent2 - child2',
                value: 'parent2 - child2 - Value 2',
                subList: []
            },
            {
                key: 'parent2 - child3',
                value: 'parent2 - child3 - Value 3',
                subList: []
            }
        ],
    },
    {
        key: 'parent3',
        value: 'parentValue3',
        checked: true,
        subList: [
            {
                key: 'parent3 - child1',
                value: 'parent3 - child1 - Value 1',
                subList: [
                    {
                        key: 'parent3 - child1 - Node 1',
                        value: 'parent3 - child1 - Node 1 - Value 1'
                    },
                    {
                        key: 'parent3 - child1 - Node 2',
                        value: 'parent3 - child1 - Node 2 - Value 2'
                    }
                ]
            }
        ],
    }
]

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            treeViewDataList: []
        };
    }

    componentDidMount() {
        this._gererateDropdownData();
        this._generateTreeViewData();
    }

    _gererateDropdownData = () => {
        const data = [];
        for (let i = 1; i < 10; i++) {
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

    _generateTreeViewData = () => {
        this.setState({ treeViewDataList: JSON.parse(JSON.stringify(treeViewData)) });
    }

    render() {
        const treeViewOption = {
            childrenField: 'subList',
            keyField: 'key',
            valueField: 'value',
            statusField: 'checked'
        }

        console.log(this.state.treeViewDataList);
        return (
            <div>
                {/* <h1>Multi Select</h1>
                <button onClick={this._gererateDropdownData}>Generate Dropdown Data</button>
                <div style={{ width: "400px" }}>
                    <MultipleSelect
                        language='en-US'
                        id="SelectList"
                        dataSource={this.state.data}
                        keyField="Id"
                        valueField="Name"
                        statusField="Checked"
                        texts={{ SelectOptions: "Please select", All: "All", SelectedItemCount: "# selected" }}
                        isAllTextShown={true}
                        hasSearchBox={true} />
                </div> */}


                <h1>Multi Select With Tree View</h1>
                <button onClick={this._generateTreeViewData}>Generate Dropdown Data With Tree View</button>
                <div style={{ width: "400px" }}>
                    <MultipleSelect
                        language='en-US'
                        id="SelectListTreeView"
                        dataSource={this.state.treeViewDataList}
                        keyField="key"
                        valueField="value"
                        statusField="checked"
                        texts={{ SelectOptions: "Please select", All: "All", SelectedItemCount: "# selected" }}
                        isAllTextShown={false}
                        hasSearchBox={false}
                        treeViewOption={treeViewOption} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));