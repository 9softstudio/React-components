import React from 'react';
import PropTypes from 'prop-types';
import { mergeClassName } from '../utils';
import Context from '../panel-context';

class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.onToggleCollapse = this.onToggleCollapse.bind(this);
        this.state = {
            isExpanded: props.defaultExpanding,
            collapsible: props.collapsible
        };
    }

    onToggleCollapse() {
        if (this.props.collapsible) {
            this.setState({ isExpanded: !this.state.isExpanded });
        }
    }

    render() {
        return (<Context.Provider value={({ ...this.state, onToggleCollapse: this.onToggleCollapse })}>
            <div className={mergeClassName(this.props, 'la-panel', this.state.isExpanded ? '' : 'is-collapsed')}>
                {this.props.children}
            </div>
        </Context.Provider>);
    }
}

Panel.defaultProps = {
    defaultExpanding: true,
    collapsible: true,
    showIcon: true
};

Panel.propTypes = {
    collapsible: PropTypes.bool,
    defaultExpanding: PropTypes.bool,
    showIcon: PropTypes.bool
};

export default Panel;
