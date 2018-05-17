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
            selectedTextElement: this.props.selectAllText
        }
    }

    static propTypes = DropdownCheckListPropTypes;

    static defaultProps = DropdownCheckListDefaultProps;

    componentWillMount() {
        var options = this.props;
        var { dataSource, idName, parentIdName, countLevel, showRoot, singleSelect, autoCheck, mode } = options;
        var { disabled, flatItems } = this.state;
        var normalizedData = (idName && parentIdName)
            ? Utils.buildHierarchyCollection(dataSource, flatItems, options)
            : Utils.normalizeData(dataSource, flatItems, options);
        var maxLevel = countLevel;
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
        var { singleSelect } = this.props;
        var { flatItems } = this.state;
        var { value, checked } = e.target;

        var itemData = Utils.getItemByKey(value, flatItems);
        var toggle = singleSelect ? Utils.toggleSingleChangeStatus : Utils.toggleChangeStatus;
        toggle(itemData, checked, flatItems, singleSelect);

        this.updateSelectedText();
    }

    onExpandClick = (e) => {
        var { flatItems } = this.state;

        var key = e.target.getAttribute("data-key")

        for (var i = 0; i < flatItems.length; i++)
            if (flatItems[i] && flatItems[i][Constants.DATA_KEYNAME] == key) {
                flatItems[i].expanded = !flatItems[i].expanded;
                break;
            }

        this.setState({ flatItems: flatItems });
    }

    onFilterChange = (value) => {
        this.filter(value);
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

    filter = (value) => {
        var { flatItems } = this.state;

        var filters = [];
        var itemElement;
        var item;
        var i;
        var itemFilter = "." + Constants.LISTITEM_CLASSNAME;

        if (value) {
            value = value.toLowerCase();

            // Step1: Push items, which contains filtered by text
            filters = flatItems.filter((item) => {
                return item && item.text.toLowerCase().indexOf(value) >= 0;
            });

            console.log(filters);

            // Step2: Hide all tag li

            // Step3: revise all filters and show tag li( curr && parent)
        } else {
            // Show all tag li
            this.showHideAllItems(true);
        }
    }

    //#endregion Utilities

    render() {
        var { dropdownName } = this.props;
        var { normalizedData, selectedTextElement, opened, listVisible } = this.state;

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
                    onFilterChange={this.onFilterChange} />
                    : ""}
            </div>
        );
    }
};