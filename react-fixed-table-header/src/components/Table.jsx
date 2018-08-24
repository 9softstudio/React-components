import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RowLayout from './RowLayout';
import PropTypes from 'prop-types';
import createTableSection from './tableSection';
import { MAX_WIDTH, DEFAULT_MILLISECOND_FOR_WAITING, DEFAULT_COLUMN_WIDTH, BODY_WIDTH, SCROLLBAR_WIDTH } from '../constants';
import Pager from './Pager';

function scrollToTop(element, scrollDuration) {
    var scrollStep = -element.scrollTop / (scrollDuration / 15),
        scrollInterval = setInterval(function(){
            if ( element.scrollTop != 0 ) {
                element.scrollBy( 0, scrollStep );
            }
            else clearInterval(scrollInterval); 
        },15);
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

        const bodyContainerProps = { className: "body-content", getRef: element => this.bodyWrapper = element };
        this.Body = createTableSection(bodyContainerProps);

        const footerContainerProps = { className: "footer-content", getRef: element => this.footerWrapper = element };
        this.Footer = createTableSection(footerContainerProps);

        const { maxWidth, bodyHeight, adjustedHeight } = this.props;
        this.diffWidth = BODY_WIDTH - maxWidth;
        this.adjustedHeight = adjustedHeight;

        this.state = {
            maxWidth,
            contentHeight: bodyHeight,
            columnsWidth: this._getColumnsWidth(props.header)
        }
    }

    static propTypes = {
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
        adjustedHeight: PropTypes.number
    }

    static defaultProps = {
        width: MAX_WIDTH,
        maxWidth: MAX_WIDTH,
        autoWidth: true,
        isPaging: false,
        adjustedHeight: 0,
        bodyHeight: 0,
        autoHeight: true
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
        window.addEventListener('resize', debounce(this._handleResize));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', debounce(this._handleResize))
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.header != prevProps.header)
        {
            this.setState({columnsWidth: this._getColumnsWidth(this.props.header)});
        }

        if(prevProps.body != this.props.body){
            scrollToTop(this.bodyWrapper, 200);
        }
    }

    _handleResize = (event) => {
        event && event.preventDefault();

        if (this.bodyWrapper && this.props.autoHeight) {
            const bodyHeight = this._calculateBodyHeight();
            if (this.state.contentHeight !== bodyHeight) {
                this.setState({ contentHeight: bodyHeight });
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
        const { width, autoWidth } = this.props;
        let sumOfColumnWidth = autoWidth ? this.state.maxWidth : width;
        sumOfColumnWidth = sumOfColumnWidth - SCROLLBAR_WIDTH;

        const newColumnsWidth = this.columnWidthSum && this.state.columnsWidth.map(cellWidth => {
            return sumOfColumnWidth / this.columnWidthSum * cellWidth
        });

        return newColumnsWidth;
    }
    render() {
        const { width, autoWidth, minWidth, header, body, footer, isPaging, pageOption, onPaging } = this.props;
        const maxWidth = this.state.maxWidth;

        const newColumnLayout = this.columnWidthSum && this.columnWidthSum !== width ?
            this._getUpdatedColumnLayout() :
            this.state.columnsWidth;

        if (!newColumnLayout) {
            return null;
        }

        const sectionProps = { width, autoWidth, minWidth, maxWidth };
        const rowLayout = <RowLayout columnLayout={newColumnLayout} />;

        const Header = this.Header;
        const Body = this.Body;
        const Footer = this.Footer;

        return (
            <div>
                <div className="table-container" style={{ maxWidth }}>
                    <Header {...sectionProps}>
                        {rowLayout}
                        {header}
                    </Header>
                    {
                        body &&
                        <Body {...sectionProps} maxHeight={this.state.contentHeight}>
                        {rowLayout}
                        {body}
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