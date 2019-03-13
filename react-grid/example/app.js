import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Row, Cell } from '../src/index';
import { buildBodyWithCheckbox, buildHeaderWithCheckbox, createDataWithCheckbox } from './sampleData';

const totalItem = 400;
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

        this.state = {
            data: createDataWithCheckbox(),
            shouldResetScrollPosition: true,
            showComponent: true
        }
    }

    handleChangeChecked = (index, checked) => {
        const {
            data
        } = this.state;

        const newState = data.map((item, i) => {
            if (i === index) {
                return Object.assign({}, item, {
                    checked
                });
            }

            return item;
        })

        this.setState({
            data: newState,
            shouldResetScrollPosition: true
        });
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

    // _buildHeader() {
    //     const isMainView = false;
    //     const firstColName = isMainView ? 'Affiliate' : 'Month';

    //     return [
    //         <Row key="h1">
    //             <Cell header={true} colWidth={120} rowSpan="3" title={firstColName}>{firstColName}</Cell>
    //             <Cell header={true} colWidth={70} rowSpan="3" title="Total Click">Total Click</Cell>
    //             <Cell header={true} colWidth={70} rowSpan="3" title="Unique Click">Unique Click</Cell>
    //             <Cell header={true} colWidth={65} rowSpan="3" title="Signup">Signup</Cell>
    //             <Cell header={true} colWidth={50} rowSpan="3" title="FDM">FDM</Cell>
    //             <Cell header={true} colWidth={60} rowSpan="3" title="Active Member">Active Member</Cell>
    //             <Cell header={true} colWidth={60} rowSpan="3" title="Qualified Member">Qualified Member</Cell>
    //             <Cell header={true} colSpan="10" title="Member Statistics">Member Statistics</Cell>
    //             <Cell header={true} colSpan={isMainView ? 5 : 4} title="Affiliate Statistics">Affiliate Statistics</Cell>
    //             {isMainView && (<Cell header={true} colWidth={50} rowSpan="3" title="Month on Month">Month on Month</Cell>)}
    //         </Row>,
    //         <Row key="h2">
    //             {false}
    //             {undefined}
    //             <Cell header={true} colWidth={75} rowSpan="2" title="Deposit">Deposit</Cell>
    //             <Cell header={true} colWidth={75} colSpan="2" title="Withdrawal">Withdrawal</Cell>
    //             <Cell header={true} colWidth={95} rowSpan="2" title="Turnover">Turnover</Cell>
    //             <Cell header={true} colWidth={95} rowSpan="2" title="WinLoss">WinLoss</Cell>
    //             {false}
    //             <Cell header={true} colWidth={70} rowSpan="2" title="Bonus">Bonus</Cell>
    //             <Cell header={true} colWidth={70} rowSpan="2" title="Platform Fee">Platform Fee</Cell>
    //             <Cell header={true} colWidth={70} rowSpan="2" title="Operational Fee">Operational Fee</Cell>
    //             <Cell header={true} colWidth={70} rowSpan="2" title="Banking Fee">Banking Fee</Cell>
    //             <Cell header={true} colWidth={70} rowSpan="2" title="Total Fee">Total Fee</Cell>
    //             {undefined}
    //             <Cell header={true} colWidth={60} rowSpan="2" title="Comm%">Comm%</Cell>
    //             <Cell header={true} colWidth={80} rowSpan="2" title="Earning">Earning</Cell>
    //             <Cell header={true} colWidth={80} rowSpan="2" title="Withdrawal">Withdrawal</Cell>
    //             {isMainView && (<Cell header={true} rowSpan="2" colWidth={70} title="Adjustment">Adjustment</Cell>)}
    //             <Cell header={true} colWidth={100} rowSpan="2" title="Balance B/F">Balance B/F</Cell>
    //             {undefined}
    //         </Row>,
    //         <Row key="h3">
    //             {null}
    //             {undefined}
    //             <Cell header={true} colWidth={75} title="Deposit">Deposit</Cell>
    //             {null}
    //             {undefined}
    //             <Cell header={true} colWidth={75} title="Withdrawal">Withdrawal</Cell>
    //             {null}
    //             {undefined}
    //         </Row>
    //     ];
    // }

    // _buildBody() {
    //     let rows = [];
    //     rows.push(
    //         <Row key={`body-rowspan-0`}>
    //             <Cell rowSpan="2">Data Rowspan 1</Cell>
    //             <Cell>Data 2.0</Cell>
    //             <Cell>Data 3.0</Cell>
    //             <Cell>Data 4.0</Cell>
    //             {this.addMoreCell ? (<Cell>Data 5.0</Cell>) : null}
    //         </Row>
    //     );
    //     rows.push(
    //         <Row key={`body-rowspan-0.1`}>
    //             <Cell>Data 2.1</Cell>
    //             <Cell>Data 3.1</Cell>
    //             <Cell>Data 4.1</Cell>
    //             {this.addMoreCell ? (<Cell>Data 5.1</Cell>) : null}
    //         </Row>
    //     );

    //     for (let i = 0; i < totalItem; i++) {
    //         rows.push(
    //             <Row key={`body${i}`}>
    //                 <Cell>Data 1</Cell>
    //                 <Cell>Data 2</Cell>
    //                 <Cell>Data 3</Cell>
    //                 <Cell>Data 4</Cell>
    //                 {this.addMoreCell ? (<Cell>Data 5</Cell>) : null}
    //             </Row>
    //         );
    //     }

    //     return rows;
    // }

    _buildFooter() {
        let rows = [];
        for (let i = 0; i < 3; i++) {
            rows.push(<Row key={`footer${i}`}>
                <Cell>Footer 1</Cell>
                <Cell>Footer 2</Cell>
                <Cell>Footer 3</Cell>
            </Row>);
        }

        return rows;
    }

    handleToggle = () => {
        this.setState((prevState) => ({
            showComponent: !prevState.showComponent
        }))
    }

    onSort(sortBy, sortOrder){
        alert("Order By " + sortBy + " " + sortOrder);
    }
    render() {
        const { data, shouldResetScrollPosition, showComponent } = this.state;
        const header = buildHeaderWithCheckbox();
        const body = buildBodyWithCheckbox(data, this.handleChangeChecked);

        return (
            <div>
                <div><button onClick={this.handleToggle}>Toggle Component</button></div>
                { showComponent ? (<Table minWidth={600} onSort={this.onSort}
                    autoWidth={true}
                    bodyHeight={300}
                    header={header}
                    body={body}
                    footer={this._buildFooter()}
                    isPaging={true}
                    pageOption={defaultPagingOption}
                    containerPadding={0}
                    shouldResetScrollPosition={shouldResetScrollPosition} />) : (<div>Component is hidden</div>)
                }
            </div>
        );
    }
}

ReactDOM.render(< App />, document.getElementById("app"));