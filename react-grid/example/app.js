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
      //  alert("Order By " + sortBy + " " + sortOrder);
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