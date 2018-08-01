import './example.scss';

import React from 'react';
import { LaPanel, LaPanelHeader, LaPanelBody } from '../src';

class Example extends React.Component {
    render() {
        return <div>
            <LaPanel collapsible={false} className="panel">
                <LaPanelHeader>This is title</LaPanelHeader>
                <LaPanelBody>This body</LaPanelBody>
            </LaPanel>
            <LaPanel defaultExpanding={false} className="panel">
                <LaPanelHeader >This is title</LaPanelHeader>
                <LaPanelBody>This body</LaPanelBody>
            </LaPanel>
        </div>
    }
}

ReactDOM.render(<Example />, document.getElementById('example'));