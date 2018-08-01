import React from 'react';

export default React.createContext({
    isExpanded: true,
    collapsible: true,
    onToggleCollapse: () => { }
});