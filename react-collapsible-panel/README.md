React Collapsible Panel
=======
## Default props
```javascript
{
    defaultExpanding: true,
    collapsible: true
}
```
## Basic Usage
```javascript
import React from 'react';
import { LaPanel, LaPanelHeader, LaPanelBody } from 'react-collapsible-panel';

class Example extends React.Component {
    render() {
        return <div>
            <LaPanel className="example-panel">
                <LaPanelHeader>This is title</LaPanelHeader>
                <LaPanelBody>This body</LaPanelBody>
            </LaPanel>
        </div>
    }
}
```