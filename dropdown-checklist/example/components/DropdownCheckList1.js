import React, { Component } from 'react'

import { DropdownCheckList } from '../../dist/index'

export default class DropdownCheckList1 extends Component {
    render() {
        return (
            <div>
                <h4>Check all + CheckBox (1 level)</h4>
                <DropdownCheckList
                    dropdownName="brand-option"
                    dataSource={[{ "Code": "A", "Name": "Apple" }, { "Code": "S", "Name": "SamSung" }, { "Code": "N", "Name": "Nokia" }, { "Code": "O", "Name": "Oppo" }, { "Code": "H", "Name": "Huawei" }]}
                    selectAll={true}
                    selectAllText="All brands"
                    multipleSelectedText="{0} selected product(s)"
                    displayName="Name"
                    showFilter={true}
                    width={300} />
            </div> 
        );
    }
}
