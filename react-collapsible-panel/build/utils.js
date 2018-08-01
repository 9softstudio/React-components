'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mergeClassName = exports.mergeClassName = function mergeClassName(props) {
    for (var _len = arguments.length, classNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        classNames[_key - 1] = arguments[_key];
    }

    if (props && props.className) {
        classNames.unshift(props.className);
    }

    return classNames.join(' ');
};