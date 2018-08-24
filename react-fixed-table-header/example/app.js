import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Row, Cell } from '../dist/index';

const totalItem = 30;
const defaultPagingOption = {
    PageIndex: 1,
    PageSize: 10,
    TotalItem: totalItem + 1,
    PageList: [10, 20, 50, 100, 500]
};

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    _buildHeader() {
        return (<Row style={{ height: 32 }}>
            <Cell colWidth={150} header={true}>Header 1</Cell>
            <Cell colWidth={150} header={true}>Header 2</Cell>
            <Cell colWidth={200} header={true}>Header 3</Cell>
            <Cell colWidth={150} header={true}>Header 4</Cell>
        </Row>);
    }

    _buildBody() {
        let rows = [];
        rows.push(
            <Row key={`body-rowspan-0`}>
                <Cell rowSpan="2">Data Rowspan 1</Cell>
                <Cell>Data 2.0</Cell>
                <Cell>Data 3.0</Cell>
                <Cell>Data 4.0</Cell>
            </Row>
        );
        rows.push(
            <Row key={`body-rowspan-0.1`}>
                <Cell>Data 2.1</Cell>
                <Cell>Data 3.1</Cell>
                <Cell>Data 4.1</Cell>
            </Row>
        );

        for (let i = 0; i < totalItem; i++) {
            rows.push(
                <Row key={`body${i}`}>
                    <Cell>Data 1</Cell>
                    <Cell>Data 2</Cell>
                    <Cell>Data 3</Cell>
                    <Cell>Data 4</Cell>
                </Row>
            );
        }

        return rows;
    }

    _buildFooter() {
        let rows = [];
        for (let i = 0; i < 3; i++) {
            rows.push(
                <Row key={`footer${i}`}>
                    <Cell>Footer 1</Cell>
                    <Cell>Footer 2</Cell>
                    <Cell>Footer 3</Cell>
                    <Cell>Footer 4</Cell>
                </Row>
            );
        }

        return rows;
    }

    render() {
        return (
            <Table
                minWidth={600}
                autoWidth={true}
                bodyHeight={300}
                header={this._buildHeader()}
                body={this._buildBody()}
                footer={this._buildFooter()}
                isPaging={true}
                pageOption={defaultPagingOption}
            />
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));