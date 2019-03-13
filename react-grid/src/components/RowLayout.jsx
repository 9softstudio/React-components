import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RowLayout extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        columnLayout: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired
    }

    _getRowLayout() {
        const { columnLayout } = this.props;

        return columnLayout.map((cellWidth, index) => {
            const width = isNaN(cellWidth) ? cellWidth : `${cellWidth}px`;

            return (<td key={`cellLayout${index}`} style={{ width: width }}></td>);
        });
    }

    render() {
        return (
            <tr className="first-row">
                {this._getRowLayout()}
            </tr>
        );
    }
}

export default RowLayout;