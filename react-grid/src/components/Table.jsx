import React, { Component } from 'react';
import RowLayout from './RowLayout';
import PropTypes from 'prop-types';
import createTableSection from './tableSection';
import { DEFAULT_MILLISECOND_FOR_WAITING, DEFAULT_COLUMN_WIDTH, SCROLLBAR_WIDTH, DEFAULT_ROW_HEIGHT } from '../constants';
import Pager from './Pager';

const clientWidth = document.body.clientWidth;

function scrollToTop(element, scrollDuration) {
    const scrollStep = -element.scrollTop / (scrollDuration / 15);
    requestAnimationFrame(() => {
        let scrollInterval = null;
        scrollInterval = setInterval(() => {
            if (element.scrollTop != 0) {
                element.scrollTop += scrollStep;
            }
            else clearInterval(scrollInterval);
        }, 15);
    })  
}

function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this,
            args = arguments;

        const later = function () {
            func.apply(context, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait || DEFAULT_MILLISECOND_FOR_WAITING);
    };
}

class Table extends Component {
    constructor(props) {
        super(props);

        this.bodyWrapper = null;
        this.footerWrapper = null;

        const headerContainerProps = { className: "header-content", isHeader: true };
        this.Header = createTableSection(headerContainerProps);

        const bodyContainerProps = { className: "body-content", isBody: true, getRef: element => this.bodyWrapper = element };
        this.Body = createTableSection(bodyContainerProps);

        const footerContainerProps = { className: "footer-content", getRef: element => this.footerWrapper = element };
        this.Footer = createTableSection(footerContainerProps);

        const { maxWidth, bodyHeight, adjustedHeight, body } = this.props;
        const maxWidthValue = maxWidth || clientWidth;

        this.diffWidth = clientWidth - maxWidthValue;
        this.adjustedHeight = adjustedHeight;

        this.debounceResizing = debounce(this._handleResize);
        this.debounceBodyScroll = debounce(this._handleBodyScroll);

        this.state = {
            maxWidth: maxWidthValue,
            contentHeight: bodyHeight,
            columnsWidth: this._getColumnsWidth(props.header),
            spaceHeight: 0,
            start: 0,
            scrollTop: 0,
            numberVisibleRows: Math.trunc(bodyHeight / DEFAULT_ROW_HEIGHT),
            end: Math.trunc(bodyHeight / DEFAULT_ROW_HEIGHT),
            isAllowedScroll: true,
            isScrolling: false,
            visibleRows: [],
            rowHeight: DEFAULT_ROW_HEIGHT,
            tableHeight: DEFAULT_ROW_HEIGHT * body.length,
        }
    }

    static propTypes = {
        onSort: PropTypes.func,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        maxWidth: PropTypes.number,
        minWidth: PropTypes.number,
        autoWidth: PropTypes.bool,
        bodyHeight: PropTypes.number,
        autoHeight: PropTypes.bool,
        header: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]).isRequired,
        body: PropTypes.arrayOf(PropTypes.object),
        footer: PropTypes.arrayOf(PropTypes.object),
        isPaging: PropTypes.bool,
        onPaging: PropTypes.func,
        pageOption: PropTypes.object,
        adjustedHeight: PropTypes.number,
        containerPadding: PropTypes.number,
        shouldResetScrollPosition: PropTypes.bool,
        spaceHeight: PropTypes.number,
    }

    static defaultProps = {
        onSort: null,
        width: clientWidth,
        maxWidth: clientWidth,
        autoWidth: true,
        isPaging: false,
        adjustedHeight: 0,
        bodyHeight: 0,
        autoHeight: true,
        containerPadding: 30,
        shouldResetScrollPosition: true,
        spaceHeight: 0
    }

    _getColumnsWidth(headerRows) {
        const headerIsArray = Array.isArray(headerRows);
        if (headerIsArray && headerRows.length === 0) {
            return null;
        }

        const columnsWidth = [];
        const currentNextCellIndexByRow = {};

        const getWidthByCells = (cells, currentRowIndex) => {
            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                if (!cell) {
                    continue;
                }

                const cellProps = cell.props;
                const colspan = Number(cellProps.colSpan);

                if (colspan && colspan > 1) {
                    const nextRowIndex = currentRowIndex + 1;
                    if (currentNextCellIndexByRow[nextRowIndex] === undefined) {
                        currentNextCellIndexByRow[nextRowIndex] = 0;
                    }
                    const fromNextCellIndex = currentNextCellIndexByRow[nextRowIndex];
                    const toNextCellIndex = fromNextCellIndex + colspan - 1;
                    const nextCells = headerRows[nextRowIndex].props.children;

                    const nextColspanCells = this._getNextColspanCells(nextCells, fromNextCellIndex, toNextCellIndex);
                    currentNextCellIndexByRow[nextRowIndex] += nextColspanCells.length;
                    getWidthByCells(nextColspanCells, nextRowIndex);
                }
                else {
                    const cellWidth = cellProps.colWidth ? cellProps.colWidth : DEFAULT_COLUMN_WIDTH;
                    columnsWidth.push(cellWidth);
                }
            }
        }

        const currentRowIndex = 0;
        const cellList = headerIsArray ? headerRows[currentRowIndex].props.children : headerRows.props.children;
        getWidthByCells(cellList, currentRowIndex);

        return columnsWidth;
    }

    _getNextColspanCells(cells, fromCellIndex, toCellIndex) {
        const colspanCells = [];
        for (let i = fromCellIndex; i <= toCellIndex; i++) {
            const cell = cells[i];
            const hasNext = i < cells.length;
            if (!cell && hasNext) {
                toCellIndex += 1;
                continue;
            }

            if (cell.props.colSpan) {
                toCellIndex -= 1;
            }

            colspanCells.push(cell);
        }

        return colspanCells;
    }

    get columnWidthSum() {
        const columnsWidth = this.state.columnsWidth;
        return !columnsWidth || !columnsWidth.length || columnsWidth.find(x => typeof x !== "number") ?
            null : columnsWidth.reduce((prev, current) => prev + current, 0);
    }

    componentDidMount() {
        this._handleResize();
        window.addEventListener('resize', this.debounceResizing);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.debounceResizing);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.header != prevProps.header) {
            this.setState({ columnsWidth: this._getColumnsWidth(this.props.header) });
        }

        if (this.props.shouldResetScrollPosition && prevProps.body != this.props.body) {
            scrollToTop(this.bodyWrapper, 200);
        }
        
        let temp = document.getElementsByTagName('tbody')[0].childNodes;
        let rowHeight = temp[1] && temp[1].offsetHeight || DEFAULT_ROW_HEIGHT;
        if (prevState.rowHeight !== rowHeight) {
            this.setState({
                rowHeight: rowHeight,
                tableHeight: rowHeight * this.props.body.length
            })
        }

        if (
          this.state.isScrolling ||
          (this.state.spaceHeight + this.state.rowHeight !== this.state.scrollTop &&
            !this.state.isAllowedScroll)
        )
        this.setState({ isAllowedScroll: true, isScrolling: false });
    }

    _handleScroll = () => {
        this.setState({ isScrolling: true });
        if (this.state.isAllowedScroll) {
            this.debounceBodyScroll();
        }
    }

    _handleBodyScroll = () => {
      let scrollTop = this.bodyWrapper.scrollTop;
      this.setState(
        {
            scrollTop: scrollTop,
            isAllowedScroll: false,
            spaceHeight: scrollTop > this.state.rowHeight ? scrollTop - this.state.rowHeight : 0 },
        () => this._handleExecuteScroll(scrollTop)
      );
    }
  
    _handleExecuteScroll = scrollTop => {
        let currentIndex = Math.trunc(scrollTop / this.state.rowHeight);
  
        if (currentIndex !== this.state.start) {
            this.setState({
            start: currentIndex,
            end:
                currentIndex + this.state.numberVisibleRows >= this.props.body.length
                ? this.props.body.length - 1
                : currentIndex + this.state.numberVisibleRows
            }, () => this._handleRenderVisibleRows());
        }
    }

    _handleRenderVisibleRows() {
        let start = this.state.end + 1 === this.props.body.length ? this.state.start - 1 : this.state.start;
        let result = [];
        for (let i = start; i < this.state.end + 2; i++) {
            result.push(this.props.body[i]);
        }
    
        this.setState({ visibleRows: result });
    }

    _handleResize = (event) => {
        event && event.preventDefault();

        if (this.bodyWrapper && this.props.autoHeight) {
            const bodyHeight = this._calculateBodyHeight();
            const numberVisibleRows = Math.trunc(bodyHeight / this.state.rowHeight);
            if (this.state.contentHeight !== bodyHeight) {
                this.setState({ contentHeight: bodyHeight, numberVisibleRows: numberVisibleRows, end: numberVisibleRows }, () => this._handleRenderVisibleRows());
            }
        }

        const maxWidth = document.body.clientWidth - this.diffWidth;
        if (this.state.maxWidth !== maxWidth) {
            this.setState({ maxWidth });
        }
    }

    _calculateBodyHeight() {
        const windowHeight = window.innerHeight;
        const footerHeight = this.footerWrapper ? this.footerWrapper.offsetHeight : 0;
        const tableContentHeight = windowHeight - (this.bodyWrapper.offsetTop + footerHeight + 70) - this.adjustedHeight;

        return tableContentHeight;
    }

    _getUpdatedColumnLayout() {
        const { width, autoWidth, containerPadding } = this.props;
        let sumOfColumnWidth = autoWidth ? this.state.maxWidth : width;
        sumOfColumnWidth = sumOfColumnWidth - containerPadding - SCROLLBAR_WIDTH;

        const newColumnsWidth = this.columnWidthSum && this.state.columnsWidth.map(cellWidth => {
            return sumOfColumnWidth / this.columnWidthSum * cellWidth
        });

        return newColumnsWidth;
    }

    render() {
        const { width, autoWidth, minWidth, header, body, footer, isPaging, pageOption, onPaging, containerPadding } = this.props;
        const maxWidth = this.state.maxWidth - containerPadding;
        const actualWidth = width - containerPadding;

        const newColumnLayout = this.columnWidthSum && this.columnWidthSum !== actualWidth ?
            this._getUpdatedColumnLayout() :
            this.state.columnsWidth;

        if (!newColumnLayout) {
            return null;
        }

        const sectionProps = { width: actualWidth, autoWidth, minWidth, maxWidth };
        const headerSectionProps = { onSort: this.props.onSort, width: actualWidth, autoWidth, minWidth, maxWidth };

        const rowLayout = <RowLayout columnLayout={newColumnLayout} />;

        const Header = this.Header;
        const Body = this.Body;
        const Footer = this.Footer;

        return (
            <div>
                <div className="table-container" style={{ maxWidth }}>
                    <Header {...headerSectionProps }>
                        {rowLayout}
                        {header}
                    </Header>
                    {
                        body &&
                        <Body
                            {...sectionProps}
                            maxHeight={this.state.contentHeight}
                            spaceHeight={this.state.spaceHeight}
                            onScroll={this._handleScroll}
                            tableHeight={this.state.tableHeight}
                            rowHeight={this.state.rowHeight}>
                            {rowLayout}
                            {this.state.visibleRows}
                        </Body>
                    }
                    {
                        footer &&
                        <Footer {...sectionProps}>
                            {rowLayout}
                            {footer}
                        </Footer>
                    }
                </div>
                {
                    isPaging && pageOption &&
                    <Pager pageOption={pageOption} onPaging={onPaging} />
                }
            </div>
        )
    }
}

export default Table;