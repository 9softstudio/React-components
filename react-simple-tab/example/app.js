import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Tabs, Tab } from '../src/index'
import Tab1 from './components/Tab1'
import Tab2 from './components/Tab2'

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Tabs>
                <Tab isActive={false} label="Tab1">
                    <Tab1 />
                </Tab>
                <Tab isActive={true} label="Tab2">
                    <Tab2 />
                </Tab>
            </Tabs>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));