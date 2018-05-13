import React, { Component } from 'react'

import { DropdownCheckList } from '../../../dist/index'

export default class DropdownCheckList3 extends Component {
    render() {
        var data = [{"BrandTypeId":1,"BrandTypeName":"Iphone","BrandTypeInfos":[{"BrandTypeId":0,"BrandTypeName":"Iphone 5"},{"BrandTypeId":0,"BrandTypeName":"Iphone 6"},{"BrandTypeId":0,"BrandTypeName":"Iphone 6 plus"},{"BrandTypeId":0,"BrandTypeName":"Iphone 7"}]},{"BrandTypeId":3,"BrandTypeName":"SamSung","BrandTypeInfos":[]},{"BrandTypeId":4,"BrandTypeName":"Nokia","BrandTypeInfos":[]},{"BrandTypeId":5,"BrandTypeName":"Oppo","BrandTypeInfos":[{"BrandTypeId":0,"BrandTypeName":"Oppo f3"}]},{"BrandTypeId":6,"BrandTypeName":"Huawei","BrandTypeInfos":[]}];
        
        return (
            <div>
                <h4>Radio have multiple checkbox</h4>
                <DropdownCheckList
                    dropdownName="ddl-brands-type"
                    dataSource={data}
                    selectAll = {false}
                    expandAll = {true}
                    childName = 'BrandTypeInfos'
                    displayName = 'BrandTypeName'
                    noSelectedText = 'Please Select One'
                    showFilter = {false}
                    showRoot = {false}
                    singleSelect = {1}
                    />
            </div> 
        );
    }
}
