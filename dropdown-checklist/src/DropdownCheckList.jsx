import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as Utils from './Utils';
import * as Constants from './Constants';
import { DropdownCheckListPropTypes } from './PropTypes';
import { DropdownCheckListDefaultProps } from './DefaultProps';
import Header from './Header';
import Body from './Body';

export default class DropdownCheckList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listVisible: false,
            normalizedData: [],
            opened: false,
            disabled: false,
            flatItems: [null],
            maxLevel: 0,
            selectedTextElement: this.props.selectAllText,
            searchValue: ""
        }
    }

    static propTypes = DropdownCheckListPropTypes;

    static defaultProps = DropdownCheckListDefaultProps;

    componentWillMount() {
        const options = this.props;
        const { dataSource, idName, parentIdName, countLevel, showRoot, singleSelect, autoCheck, mode } = options;
        let { disabled, flatItems } = this.state;
        let normalizedData = (idName && parentIdName)
            ? Utils.buildHierarchyCollection(dataSource, flatItems, options)
            : Utils.normalizeData(dataSource, flatItems, options);
        let maxLevel = countLevel;
        if (showRoot) {
            normalizedData = Utils.addRootNode(normalizedData, flatItems, options);
        }
        if (!singleSelect && autoCheck) {
            Utils.autoChecks(normalizedData);
        }
        if (maxLevel === -1 && !singleSelect) {
            maxLevel = Utils.findMaxlevel(flatItems);
        }
        this.updateSelectedText();
        this.setDisableStatus(disabled === true);
        this.setState({
            normalizedData: normalizedData,
            maxLevel: maxLevel
        });
    }

    onClickDropDownHandler = () => {
        this.setState((prevState) => (
            {
                listVisible: !prevState.listVisible,
                opened: !prevState.opened
            }));
        document.addEventListener("click", this.handleOutsideClick);
    }

    handleOutsideClick = (e) => {
        // ignore clicks on the component itself
        if (this.dropdownCheckList.contains(e.target)) {
            return;
        }

        this.setState({
            listVisible: false,
            opened: false
        });
        document.removeEventListener("click", this.handleOutsideClick);
    }

    //#region helpers
    onCheckChanged = (e) => {
        const { singleSelect } = this.props;
        let { flatItems } = this.state;
        let { value, checked } = e.target;

        let itemData = Utils.getItemByKey(value, flatItems);
        let toggle = singleSelect ? Utils.toggleSingleChangeStatus : Utils.toggleChangeStatus;
        toggle(itemData, checked, flatItems, singleSelect);

        this.updateSelectedText();
    }

    onExpandClick = (e) => {
        let { flatItems } = this.state;

        const key = e.target.getAttribute("data-key")

        for (let item of flatItems)
            if (item && item[Constants.DATA_KEYNAME] == key) {
                item.expanded = !item.expanded;
                break;
            }

        this.setState({flatItems});
    }

    onFilterChange = (value) => {
        let { flatItems } = this.state;
        
        Utils.filter(value, flatItems);

        this.setState({flatItems, searchValue: value});
    }

    // #endregion helpers

    //#region Utilities

    updateSelectedText = () => {
        this.setState({
            selectedTextElement: Utils.getSelectedText(this.props, this.state.maxLevel, this.state.flatItems)
        });
    }

    setDisableStatus = (isDisabled) => {
        this.setState({
            disabled: isDisabled
        });
    }

    //#endregion Utilities

    render() {
        const { dropdownName } = this.props;
        let { normalizedData, selectedTextElement, opened, listVisible, searchValue } = this.state;

        return (
            <div ref={el => { this.dropdownCheckList = el }}>
                <Header
                    dropdownName={dropdownName}
                    opened={opened}
                    onClickHandler={this.onClickDropDownHandler}
                    selectedTextElement={selectedTextElement}
                    headerRef={el => { this.dropdownElement = el }} />

                {listVisible ? <Body dropdownElement={el => { this.dropdownElement = el }}
                    options={this.props}
                    dropdownElement={this.dropdownElement}
                    normalizedData={normalizedData}
                    onCheckChanged={this.onCheckChanged}
                    onExpandClick={this.onExpandClick}
                    onFilterChange={this.onFilterChange}
                    searchValue={searchValue} />
                    : ""}
            </div>
        );
    }
};