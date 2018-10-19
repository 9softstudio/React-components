import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Breadcrumb } from '../dist/index';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 3
        };
    }

    render() {
        const items = [];
        items.push({ label: "Level 11", value: 1, });
        items.push({ label: "Level 2", value: 2, });
        items.push({ label: "Level 3", value: 3, });

        return (
        <div>
        <Breadcrumb items={items} value={this.state.level} onChange={(item) => this.setState({level: item.value})}/>
        <div>
            Level : {this.state.level}
        </div>
        </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));