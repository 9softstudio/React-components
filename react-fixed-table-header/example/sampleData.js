import React from 'react';
import { Row, Cell } from './dist/fixed-table-header';

const rowCount = 100;
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
        <Cell colWidth={150} header={true}>Header 1</Cell>
        <Cell colWidth={150} header={true}>Header 2</Cell>
        <Cell colWidth={200} header={true}>Header 3</Cell>
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