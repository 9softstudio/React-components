'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils');

var _panelContext = require('../panel-context');

var _panelContext2 = _interopRequireDefault(_panelContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panel = function (_React$Component) {
    _inherits(Panel, _React$Component);

    function Panel(props) {
        _classCallCheck(this, Panel);

        var _this = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, props));

        _this.onToggleCollapse = _this.onToggleCollapse.bind(_this);
        _this.state = {
            isExpanded: props.defaultExpanding,
            collapsible: props.collapsible
        };
        return _this;
    }

    _createClass(Panel, [{
        key: 'onToggleCollapse',
        value: function onToggleCollapse() {
            if (this.props.collapsible) {
                this.setState({ isExpanded: !this.state.isExpanded });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _panelContext2.default.Provider,
                { value: _extends({}, this.state, { onToggleCollapse: this.onToggleCollapse }) },
                _react2.default.createElement(
                    'div',
                    { className: (0, _utils.mergeClassName)(this.props, 'la-panel', this.state.isExpanded ? '' : 'is-collapsed') },
                    this.props.children
                )
            );
        }
    }]);

    return Panel;
}(_react2.default.Component);

Panel.defaultProps = {
    defaultExpanding: true,
    collapsible: true,
    showIcon: true
};

Panel.propTypes = {
    defaultExpanding: _propTypes2.default.bool,
    collapsible: _propTypes2.default.bool,
    showIcon: _propTypes2.default.bool
};

exports.default = Panel;