import React, { Component } from 'react'

import Tab from './Tab'

export default class Tabs extends Component {
    constructor(props) {
        super(props);

        this.tabComponents = React.Children.toArray(props.children);
        const tabState = this.tabComponents.map((item) => {
            return item.props.isActive;
        });

        this.state = {
            tabState: tabState
        }
    }

    _renderActiveTabContent() {
        const activeTabIndex = this.state.tabState.findIndex(x => x);

        return this.tabComponents[activeTabIndex].props.children;
    }

    onTabChange(tabIndex) {
        const newTabState = this.state.tabState.map((item, index) => {
            return index === tabIndex;
        });

        this.setState({
            tabState: newTabState
        });
    }

    _renderTabComponents() {
        return this.tabComponents.map((item, index) => {
            return (
                <Tab key={`tab${index}`} 
                     isActive={this.state.tabState[index]} 
                     label={item.props.label} 
                     onClick={this.onTabChange.bind(this, index)}
                     url={item.props.url}
                     />
            );
        });
    }

    render() {
        return (
            <div className="page-filter-tab">
                <div className="header-tab">
                    <div className="content-tab">
                        <ul className="tabs">{this._renderTabComponents()}</ul>
                    </div>
                </div>
                <div className="tab-panel">{this._renderActiveTabContent()}</div>
            </div>
        );
    }
}