import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import DropdownCheckList1 from './components/dropDowndCheckList/DropdownCheckList1'
import DropdownCheckList2 from './components/dropDowndCheckList/DropdownCheckList2'
import DropdownCheckList3 from './components/dropDowndCheckList/DropdownCheckList3'
import DropdownCheckList4 from './components/dropDowndCheckList/DropdownCheckList4'

export default class App extends Component {
    render() {
        return (
            <div >
                <div className="float-left" style={{float: "left", width: 400}}>
                    <DropdownCheckList1 />
                </div>
                <div className="float-left" style={{float: "left", width: 400}}>
                    <DropdownCheckList2 />
                </div>
                <div className="float-left" style={{float: "left", width: 400}}>
                    <DropdownCheckList3 />
                </div>
                <div className="float-left" style={{float: "left", width: 400}}>
                    <DropdownCheckList4 />
                </div>
            </div> 
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));