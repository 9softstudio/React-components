import React from 'react';
import { Row, HeaderCell, Cell } from './dist/react-grid';

const rowCount = 2000;
export const createDataWithCheckbox = () => {
    const data = [];
    for(let i = 0; i < rowCount; i++){
        data.push({
            checked: false,
            name: 'name' + i,
            email: i + '@gmail.com'
        })
    }

    return data;
}

export const buildHeaderWithCheckbox = () => {
    return (<Row style={{ height: 32 }}>
        <HeaderCell colWidth={150} >Header 1</HeaderCell>
        <HeaderCell colWidth={150} sortable={true} sorting={true} asc={true} onClick={()=>alert('Sorted!')}>Header 2</HeaderCell>
        <HeaderCell colWidth={200} >Header 3</HeaderCell>
    </Row>);
}

export const buildBodyWithCheckbox = (data, onChange) => {
    const dataRowList = [];
    for(let i = 0; i < rowCount; i++){
        const item = data[i];
        dataRowList.push(
            (<Row key={i}>
                <Cell><input type="checkbox" checked={item.checked} onChange={(e) => onChange(i, e.target.checked)} /></Cell>
                <Cell>{item.name}</Cell>
                <Cell>{item.email}</Cell>
            </Row>)
        )
    }

    return dataRowList;
}