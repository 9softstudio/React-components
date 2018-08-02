(function (React,PropTypes) {
    'use strict';

    React = React && React.hasOwnProperty('default') ? React['default'] : React;
    PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

    var mergeClassName = function mergeClassName(props) {
        for (var _len = arguments.length, classNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            classNames[_key - 1] = arguments[_key];
        }

        if (props && props.className) {
            classNames.unshift(props.className);
        }

        return classNames.join(' ');
    };

    var Context = React.createContext({
        isExpanded: true,
        collapsible: true,
        onToggleCollapse: function onToggleCollapse() {}
    });

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    var inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    var possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    var Panel = function (_React$Component) {
        inherits(Panel, _React$Component);

        function Panel(props) {
            classCallCheck(this, Panel);

            var _this = possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, props));

            _this.onToggleCollapse = _this.onToggleCollapse.bind(_this);
            _this.state = {
                isExpanded: props.defaultExpanding,
                collapsible: props.collapsible
            };
            return _this;
        }

        createClass(Panel, [{
            key: 'onToggleCollapse',
            value: function onToggleCollapse() {
                if (this.props.collapsible) {
                    this.setState({ isExpanded: !this.state.isExpanded });
                }
            }
        }, {
            key: 'render',
            value: function render() {
                return React.createElement(
                    Context.Provider,
                    { value: _extends({}, this.state, { onToggleCollapse: this.onToggleCollapse }) },
                    React.createElement(
                        'div',
                        { className: mergeClassName(this.props, 'la-panel', this.state.isExpanded ? '' : 'is-collapsed') },
                        this.props.children
                    )
                );
            }
        }]);
        return Panel;
    }(React.Component);

    Panel.defaultProps = {
        defaultExpanding: true,
        collapsible: true,
        showIcon: true
    };

    Panel.propTypes = {
        defaultExpanding: PropTypes.bool,
        collapsible: PropTypes.bool,
        showIcon: PropTypes.bool
    };

    var Header = (function (props) {
        return React.createElement(
            Context.Consumer,
            null,
            function (_ref) {
                var onToggleCollapse = _ref.onToggleCollapse,
                    collapsible = _ref.collapsible;
                return React.createElement(
                    'div',
                    { className: mergeClassName(props, 'la-panel__header') },
                    collapsible && React.createElement('span', { className: 'la-panel__indicator', onClick: onToggleCollapse }),
                    props.children
                );
            }
        );
    });

    var Body = (function (props) {
        return React.createElement(
            Context.Consumer,
            null,
            function (_ref) {
                var isExpanded = _ref.isExpanded;
                return isExpanded && React.createElement(
                    'div',
                    { className: mergeClassName(props, 'la-panel__body') },
                    props.children
                );
            }
        );
    });

    var LaPanel = Panel;
    var LaPanelHeader = Header;
    var LaPanelBody = Body;

    var Example = function (_React$Component) {
        inherits(Example, _React$Component);

        function Example() {
            classCallCheck(this, Example);
            return possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).apply(this, arguments));
        }

        createClass(Example, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        LaPanel,
                        { collapsible: false, className: 'example-panel' },
                        React.createElement(
                            LaPanelHeader,
                            null,
                            'This is title'
                        ),
                        React.createElement(
                            LaPanelBody,
                            null,
                            'This body'
                        )
                    ),
                    React.createElement(
                        LaPanel,
                        { defaultExpanding: false, className: 'example-panel' },
                        React.createElement(
                            LaPanelHeader,
                            null,
                            'This is title'
                        ),
                        React.createElement(
                            LaPanelBody,
                            null,
                            'This body'
                        )
                    )
                );
            }
        }]);
        return Example;
    }(React.Component);

    ReactDOM.render(React.createElement(Example, null), document.getElementById('example'));

}(React,PropTypes));
