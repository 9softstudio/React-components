import React from 'react';
import ReactDOM from 'react-dom';
import LaPanel from '../src';

class Example extends React.Component {
    render() {
        return (<div>
            <LaPanel collapsible={false} className="example-panel">
                <LaPanel.Header>This panel has disabled collapsible</LaPanel.Header>
                <LaPanel.Body>Panel body is expanded by default</LaPanel.Body>
            </LaPanel>
            <LaPanel defaultExpanding={false} className="example-panel">
                <LaPanel.Header>This panel is collapsible</LaPanel.Header>
                <LaPanel.Body>This body</LaPanel.Body>
            </LaPanel>
        </div>);
    }
}

ReactDOM.render(<Example />, document.getElementById('example'));