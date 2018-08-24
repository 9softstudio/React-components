import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: this.props.pageOption.PageIndex
        };
    }

    static propTypes = {
        pageOption: PropTypes.shape({
            PageIndex: PropTypes.number,
            PageSize: PropTypes.number,
            PageList: PropTypes.arrayOf(PropTypes.number),
            TotalItem: PropTypes.number
        }),
        onPaging: PropTypes.func,
        isShowPagingInfo: PropTypes.bool,
        isAllowInputPageIndex: PropTypes.bool
    };

    static defaultProps = {
        pageOption: {
            PageIndex: 1,
            PageSize: 50,
            PageList: [50, 100, 200],
            TotalItem: 0
        },
        isShowPagingInfo: true,
        isAllowInputPageIndex: true
    };

    componentDidUpdate(prevProps, prevState) {
        const pageIndex = this.props.pageOption.PageIndex;
        if (pageIndex !== prevProps.pageOption.PageIndex) {
            this._updateState(pageIndex);
        }
    }

    goToPage(index, pageSize) {
        this.props.onPaging && this.props.onPaging(index, pageSize);
    }

    onKeyUpHandle = (e, totalPage) => {
        const code = e.keyCode ? e.keyCode : e.which;
        if (code === 13) {
            var value = parseInt(this.state.inputValue);
            if (value > 0 && value <= totalPage) {
                this.goToPage(value, this.props.pageOption.PageSize);
            }
        }
    }

    onClickHandle(isDisable, handleFunc) {
        if (!isDisable) {
            handleFunc();
        }
    }

    onInputChangeHandler = (e) => {
        const pattern = /^\d*$/;
        const { value } = e.target;
        const isValidNumber = pattern.test(value);
        if (isValidNumber) {
            this._updateState(value);
        }
    }

    _updateState(inputValue) {
        this.setState({ inputValue });
    }

    _renderPageSizeSelection(isDisable, pageIndex, pageSize) {
        return (
            <select className="pagesize-select" disabled={isDisable} value={pageSize} onChange={(e) => this.goToPage(1, Number(e.target.value))}>
                {this._renderPageSizeOption(this.props.pageOption.PageList)}
            </select>
        );
    }

    _renderPageSizeOption(pageList) {
        return pageList.map((item, index) => {
            return (<option key={`pagesize${index}`} value={item}>{item}</option>);
        });
    }

    _renderPageIcon(iconClass, isDisable, onClickFunc) {
        return (<a href="javascript:;" className={`icon ${iconClass} ${isDisable ? "disable" : ""}`} onClick={() => this.onClickHandle(isDisable, onClickFunc)}></a>);
    }

    _renderPageInput(index, totalPage) {
        return (
            <div className="page-input"><span>Page </span><input type="text" className="page-form" value={index} maxLength="4" size="2"
                onChange={this.onInputChangeHandler}
                onKeyUp={(e) => this.onKeyUpHandle(e, totalPage)} />
                <span>{` of ${totalPage}`} </span>
            </div>);
    }

    _renderPageLabel(index, totalPage) {
        return (<div className="page-input"><span>Page {`${index} of ${totalPage} `}</span></div>);
    }

    _renderPageInfo(index, pageSize, totalItem) {
        const viewFrom = ((index - 1) * pageSize) + 1;
        const viewTo = index * pageSize;
        return (<span className="page-info">{`View ${viewFrom}-${viewTo > totalItem ? totalItem : viewTo} of ${totalItem}`}</span>);
    }

    render() {
        const { isShowPagingInfo, isAllowInputPageIndex, pageOption } = this.props;
        const { PageIndex, PageSize, TotalItem, PageList } = pageOption;
        const { inputValue } = this.state;

        const isDisable = isNaN(parseInt(inputValue));

        const isShow = TotalItem > PageList[0];
        const totalPage = Math.ceil(TotalItem / PageSize);

        return (
            <div className="page-container center-align" style={{ display: `${isShow ? 'block' : 'none'}` }}>
                {this._renderPageIcon("page-first", PageIndex === 1, () => this.goToPage(1, PageSize))}
                {this._renderPageIcon("page-prev", isDisable || PageIndex <= 1 || PageIndex > totalPage, () => this.goToPage(PageIndex - 1, PageSize))}
                {isAllowInputPageIndex ? this._renderPageInput(inputValue, totalPage) : this._renderPageLabel(PageIndex, totalPage)}
                {this._renderPageIcon("page-next", isDisable || PageIndex >= totalPage || PageIndex < 1, () => this.goToPage(PageIndex + 1, PageSize))}
                {this._renderPageIcon("page-last", PageIndex === totalPage, () => this.goToPage(totalPage, PageSize))}
                {this._renderPageSizeSelection(isDisable, PageIndex, PageSize)}
                {isShowPagingInfo && this._renderPageInfo(PageIndex, PageSize, TotalItem)}
            </div>);
    }
}