'use strict';
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/react-collapsible-panel.pro.js');
} else {
    module.exports = require('./dist/react-collapsible-panel.dev.js');
}