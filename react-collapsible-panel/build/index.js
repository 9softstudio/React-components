'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LaPanelBody = exports.LaPanelHeader = exports.LaPanel = undefined;

require('./scss/styles.scss');

var _Panel = require('./components/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Body = require('./components/Body');

var _Body2 = _interopRequireDefault(_Body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LaPanel = exports.LaPanel = _Panel2.default;
var LaPanelHeader = exports.LaPanelHeader = _Header2.default;
var LaPanelBody = exports.LaPanelBody = _Body2.default;