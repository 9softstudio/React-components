'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

var _panelContext = require('../panel-context');

var _panelContext2 = _interopRequireDefault(_panelContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    return _react2.default.createElement(
        _panelContext2.default.Consumer,
        null,
        function (_ref) {
            var onToggleCollapse = _ref.onToggleCollapse,
                collapsible = _ref.collapsible;
            return _react2.default.createElement(
                'div',
                { className: (0, _utils.mergeClassName)(props, 'la-panel__header') },
                collapsible && _react2.default.createElement('span', { className: 'la-panel__indicator', onClick: onToggleCollapse }),
                props.children
            );
        }
    );
};