[![Build Status](https://travis-ci.org/vietquocbui/react-collapsible-panel.svg?branch=master)](https://travis-ci.org/vietquocbui/react-collapsible-panel)
[![Coverage Status](https://coveralls.io/repos/github/vietquocbui/react-collapsible-panel/badge.svg)](https://coveralls.io/github/vietquocbui/react-collapsible-panel)

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
        return <LaPanel className="example-panel">
            <LaPanelHeader>This is title</LaPanelHeader>
            <LaPanelBody>This body</LaPanelBody>
        </LaPanel>
    }
}
```
