import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import MultipleSelect, { TreeViewSelect } from '../src/index'

const treeViewData = [
    {
        key: 'parent1',
        value: 'parentValue1',
        checked: false,
        children: [
            {
                name: 'parent1 - child1',
                value: 'parent1 - child1 - Value 1',
                children: []
            },
            {
                name: 'parent1 - child2',
                value: 'parent1 - child2 - Value 2',
                children: []
            },
            {
                name: 'parent1 - child3',
                value: 'parent1 - child3 - Value 3',
                children: []
            }
        ],
    },
    {
        key: 'parent2',
        value: 'parentValue2',
        checked: false,
        children: [
            {
                name: 'parent2 - child1',
                value: 'parent2 - child1 - Value 1',
                children: []
            },
            {
                name: 'parent2 - child2',
                value: 'parent2 - child2 - Value 2',
                children: []
            },
            {
                name: 'parent2 - child3',
                value: 'parent2 - child3 - Value 3',
                children: []
            }
        ],
    },
    {
        key: 'parent3',
        value: 'parentValue3',
        checked: false,
        children: [
            {
                name: 'parent3 - child1',
                value: 'parent3 - child1 - Value 1',
                children: [
                    {
                        name: 'parent3 - child1 - Node 1',
                        value: 'parent3 - child1 - Node 1 - Value 1'
                    },
                    {
                        name: 'parent3 - child1 - Node 2',
                        value: 'parent3 - child1 - Node 2 - Value 2'
                    }
                ]
            }
        ],
    }
]

const originalDataSource = [
    {
        checked: false,
        key: "parent1",
        level: 0,
        parentKey: null,
        value: "parentValue1",
        visible: true,
    },
    {
        key: "parent1 - child1",
        value: "parent1 - child1 - Value 1",
        checked: false,
        visible: true,
        level: 1,
        parentKey: "parent1"
    },
    {
        checked: false,
        key: "parent3",
        level: 0,
        parentKey: null,
        value: "parentValue3",
        visible: true,
    },
    {
        checked: false,
        key: "parent3 - child1",
        level: 1,
        parentKey: "parent3",
        value: "parent3 - child1 - Value 1",
        visible: true
    },
    {
        checked: false,
        key: "parent3 - child1 - Node 1",
        level: 2,
        parentKey: "parent3 - child1",
        value: "parent3 - child1 - Node 1 - Value 1",
        visible: true
    },
    {
        checked: false,
        key: "parent3 - child1 - Node 2",
        level: 2,
        parentKey: "parent3 - child1",
        value: "parent3 - child1 - Node 2 - Value 2",
        visible: true
    }
];

const _AppData = {
    subsidiaryList: [{"Name":"Lable 2","ID":0,"Value":"2","Checked":true,"Children":[{"Name":"jflh","ID":0,"Value":"jflh","Checked":true,"Children":null},{"Name":"har6","ID":0,"Value":"har6","Checked":true,"Children":null},{"Name":"har7","ID":0,"Value":"har7","Checked":true,"Children":null}]},{"Name":"Lable 1","ID":0,"Value":"1","Checked":true,"Children":[{"Name":"88ps","ID":0,"Value":"88ps","Checked":true,"Children":null},{"Name":"alib","ID":0,"Value":"alib","Checked":true,"Children":null},{"Name":"har1","ID":0,"Value":"har1","Checked":true,"Children":null},{"Name":"har2","ID":0,"Value":"har2","Checked":true,"Children":null},{"Name":"har3","ID":0,"Value":"har3","Checked":true,"Children":null},{"Name":"har4","ID":0,"Value":"har4","Checked":true,"Children":null},{"Name":"har5","ID":0,"Value":"har5","Checked":true,"Children":null}]},{"Name":"Others","ID":0,"Value":"-2147483648","Checked":true,"Children":[{"Name":"R7","ID":0,"Value":"R7","Checked":true,"Children":null}]}],
};

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            treeViewDataList: [],
            selectedKeyForTreeView: '',
            treeViewOriginalDataList: []
        };
    }

    componentDidMount() {
        this._gererateDropdownData();
        this._generateTreeViewData();
        this._generateOriginalTreeViewData();
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
        this.setState({ treeViewDataList: JSON.parse(JSON.stringify(treeViewData)), selectedKeyForTreeView: '' });
    }

    _generateOriginalTreeViewData = () => {
        this.setState({ treeViewOriginalDataList: JSON.parse(JSON.stringify(originalDataSource)) })
    }

    handleChangeTreeView = (selectedItem, selectedItemsKey, treeViewList) => {
        console.log(treeViewList);
        this.setState({ selectedKeyForTreeView: selectedItemsKey });
    }

    handleChangeMultiSelect = (selectedItem, selectedItemsKey) => {
        console.log(selectedItemsKey);
    }

    render() {
        const treeViewOption = {
            childrenField: 'children',
            keyField: 'name',
            valueField: 'name',
            statusField: 'checked',
            indent: 30,
            includeSelectedParentKey: true,
            useOriginalDataSource: false
        }

        console.log(this.state.treeViewDataList);
        const { selectedKeyForTreeView } = this.state;

        const treeViewOption11 = {
            childrenField: 'Children',
            keyField: 'Value',
            valueField: 'Name',
            statusField: 'Checked',
            indent: 30,
            includeSelectedParentKey: false,
            useOriginalDataSource: false
        }

        return (
            <div>
                <h1>Multi Select</h1>
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
                        hasSearchBox={true}
                        onChange={this.handleChangeMultiSelect} />
                </div>


                <div>
                    <div style={{ minWidth: "400px", display: "inline-block" }}>
                        <h1>Tree View Select</h1>
                        <button onClick={this._generateTreeViewData}>Generate Dropdown TreeViewSelect Data</button>
                        <div style={{ width: "400px" }}>
                            {/* <TreeViewSelect
                                language='en-US'
                                id="SelectListTreeView"
                                dataSource={_AppData.subsidiaryList}
                                keyField="Value"
                                valueField="Name"
                                statusField="Checked"
                                texts={{ SelectOptions: "Please select", All: "All", SelectedItemCount: "# selected" }}
                                isAllTextShown={false}
                                hasSearchBox={false}
                                treeViewOption={treeViewOption11}
                                onChange={this.handleChangeTreeView} /> */}
                                <TreeViewSelect
                                    language={'en-US'}
                                    id="SubsidiaryTreeView"
                                    dataSource={_AppData.subsidiaryList}
                                    keyField="Value"
                                    valueField="Name"
                                    statusField="Checked"
                                    texts={{ SelectOptions: "Please select", All: "All", SelectedItemCount: "# selected" }}
                                    isAllTextShown={false}
                                    hasSearchBox={false}
                                    treeViewOption={treeViewOption11}
                                    onChange={this.handleChangeTreeView} />
                        </div>
                    </div>
                    <div style={{ minWidth: "400px", display: "inline-block" }}>
                        <p>Selected Item Key: {selectedKeyForTreeView}</p>
                    </div>
                </div>

                <div>
                    <div style={{ minWidth: "400px", display: "inline-block" }}>
                        <h1>Tree View Select With Original Data Source</h1>
                        <div>{`[
                            {
                                checked: false,
                                key: "parent1",
                                level: 0,
                                parentKey: null,
                                value: "parentValue1",
                                visible: true
                            },
                            {
                                key: "parent1 - child1",
                                value: "parent1 - child1 - Value 1",
                                checked: false,
                                visible: true,
                                level: 1,
                                parentKey: "parent1"
                            }, {
                                checked: false,
                                key: "parent3",
                                level: 0,
                                parentKey: null,
                                value: "parentValue3",
                                visible: true
                            }, ...
                        ]`}</div>
                        <div style={{ width: "400px" }}>
                            <TreeViewSelect
                                language='en-US'
                                id="SelectListTreeView2"
                                dataSource={this.state.treeViewOriginalDataList}
                                texts={{ SelectOptions: "Please select", All: "All", SelectedItemCount: "# selected" }}
                                isAllTextShown={false}
                                hasSearchBox={true}
                                treeViewOption={{useOriginalDataSource: true}} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));