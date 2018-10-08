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

        this.addMoreCell = true;
    }

    // _buildHeader() {
    //     return (<Row style={{ height: 32 }}>
    //         <Cell colWidth={150} header={true}>Header 1</Cell>
    //         <Cell colWidth={150} header={true}>Header 2</Cell>
    //         <Cell colWidth={200} header={true}>Header 3</Cell>
    //         <Cell colWidth={150} header={true}>Header 4</Cell>
    //         {this.addMoreCell ? (<Cell colWidth={150} header={true}>Header 5</Cell>) : null}
    //     </Row>);
    // }

    _buildHeader() {
        const isMainView = false;
        const firstColName = isMainView ? 'Affiliate' : 'Month';

        return [
            <Row>
                <Cell header={true} colWidth={120} rowSpan="2" title={firstColName}>{firstColName}</Cell>
                <Cell header={true} colWidth={70} rowSpan="2" title="Total Click">Total Click</Cell>
                <Cell header={true} colWidth={70} rowSpan="2" title="Unique Click">Unique Click</Cell>
                <Cell header={true} colWidth={65} rowSpan="2" title="Signup">Signup</Cell>
                <Cell header={true} colWidth={50} rowSpan="2" title="FDM">FDM</Cell>
                <Cell header={true} colWidth={60} rowSpan="2" title="Active Member">Active Member</Cell>
                <Cell header={true} colWidth={60} rowSpan="2" title="Qualified Member">Qualified Member</Cell>
                <Cell header={true} colSpan="9" title="Member Statistics">Member Statistics</Cell>
                <Cell header={true} colSpan={isMainView ? 5 : 4} title="Affiliate Statistics">Affiliate Statistics</Cell>
                {isMainView && (<Cell header={true} colWidth={50} rowSpan="2" title="Month on Month">Month on Month</Cell>)}
            </Row>,
            <Row>
                <Cell header={true} colWidth={75} title="Deposit">Deposit</Cell>
                <Cell header={true} colWidth={75} title="Withdrawal">Withdrawal</Cell>
                <Cell header={true} colWidth={95} title="Turnover">Turnover</Cell>
                <Cell header={true} colWidth={95} title="WinLoss">WinLoss</Cell>
                <Cell header={true} colWidth={70} title="Bonus">Bonus</Cell>
                <Cell header={true} colWidth={70} title="Platform Fee">Platform Fee</Cell>
                <Cell header={true} colWidth={70} title="Operational Fee">Operational Fee</Cell>
                <Cell header={true} colWidth={70} title="Banking Fee">Banking Fee</Cell>
                <Cell header={true} colWidth={70} title="Total Fee">Total Fee</Cell>

                <Cell header={true} colWidth={60} title="Comm%">Comm%</Cell>
                <Cell header={true} colWidth={80} title="Earning">Earning</Cell>
                <Cell header={true} colWidth={80} title="Withdrawal">Withdrawal</Cell>
                {isMainView && (<Cell header={true} colWidth={70} title="Adjustment">Adjustment</Cell>)}
                <Cell header={true} colWidth={100} title="Balance B/F">Balance B/F</Cell>
            </Row>
        ];
    }

    _buildBody() {
        let rows = [];
        rows.push(
            <Row key={`body-rowspan-0`}>
                <Cell rowSpan="2">Data Rowspan 1</Cell>
                <Cell>Data 2.0</Cell>
                <Cell>Data 3.0</Cell>
                <Cell>Data 4.0</Cell>
                {this.addMoreCell ? (<Cell>Data 5.0</Cell>) : null}
            </Row>
        );
        rows.push(
            <Row key={`body-rowspan-0.1`}>
                <Cell>Data 2.1</Cell>
                <Cell>Data 3.1</Cell>
                <Cell>Data 4.1</Cell>
                {this.addMoreCell ? (<Cell>Data 5.1</Cell>) : null}
            </Row>
        );

        for (let i = 0; i < totalItem; i++) {
            rows.push(
                <Row key={`body${i}`}>
                    <Cell>Data 1</Cell>
                    <Cell>Data 2</Cell>
                    <Cell>Data 3</Cell>
                    <Cell>Data 4</Cell>
                    {this.addMoreCell ? (<Cell>Data 5</Cell>) : null}
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
                    {this.addMoreCell ? (<Cell>Footer 5</Cell>) : null}
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
                body={[]}
                footer={[]}
                isPaging={true}
                pageOption={defaultPagingOption}
                containerPadding={0}
            />
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));