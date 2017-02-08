(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'moment', 'melon-core/classname/cxBuilder', '../util', './Header', './Clock', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('moment'), require('melon-core/classname/cxBuilder'), require('../util'), require('./Header'), require('./Clock'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.moment, global.cxBuilder, global.util, global.Header, global.Clock, global.babelHelpers);
        global.Panel = mod.exports;
    }
})(this, function (exports, _react, _moment, _cxBuilder, _util, _Header, _Clock, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _moment2 = babelHelpers.interopRequireDefault(_moment);

    var Util = babelHelpers.interopRequireWildcard(_util);

    var _Header2 = babelHelpers.interopRequireDefault(_Header);

    var _Clock2 = babelHelpers.interopRequireDefault(_Clock);

    /**
     * @file melon/TimePickerPanel
     * @author cxtom(cxtom2008@qq.com)
     */

    var cx = (0, _cxBuilder.create)('TimePickerPanel');

    /**
     * melon/TimePickerPanel
     *
     * @extends {React.Component}
     * @class
     */

    var TimePickerPanel = function (_Component) {
        babelHelpers.inherits(TimePickerPanel, _Component);

        /**
         * 构造函数
         *
         * @constructor
         * @public
         * @param  {*} props 组件属性
         */
        function TimePickerPanel(props) {
            babelHelpers.classCallCheck(this, TimePickerPanel);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onModeChange = _this.onModeChange.bind(_this);
            _this.onTimeChange = _this.onTimeChange.bind(_this);

            /**
             * 初始状态
             *
             * @private
             * @type {Object}
             */
            _this.state = {
                time: props.time,
                mode: props.mode
            };
            return _this;
        }

        /**
         * react 组件生命周期——属性更新
         *
         * @public
         * @override
         * @param {Object} nextProps 更新的属性
         */


        TimePickerPanel.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            var time = nextProps.time;

            if (!(0, _moment2['default'])(time).isSame(this.props.time)) {
                this.setState({ time: time });
            }
        };

        TimePickerPanel.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
            return !(0, _moment2['default'])(nextState.time).isSame(this.state.time) || nextState.mode !== this.state.mode;
        };

        TimePickerPanel.prototype.onModeChange = function onModeChange(_ref) {
            var mode = _ref.mode;

            this.setState({ mode: mode });
        };

        TimePickerPanel.prototype.onTimeChange = function onTimeChange(_ref2) {
            var _this2 = this;

            var time = _ref2.time,
                mode = _ref2.mode;
            var _props = this.props,
                begin = _props.begin,
                end = _props.end;


            time = Util.closest(time, begin, end);

            var nextState = {
                time: time,
                mode: mode || this.state.mode
            };

            this.setState(nextState, function () {
                _this2.props.onChange({
                    time: time
                });
            });
        };

        TimePickerPanel.prototype.render = function render() {
            var _state = this.state,
                time = _state.time,
                mode = _state.mode;
            var _props2 = this.props,
                begin = _props2.begin,
                end = _props2.end;


            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).build() },
                _react2['default'].createElement(_Header2['default'], {
                    time: time,
                    mode: mode,
                    onModeChange: this.onModeChange,
                    onChange: this.onTimeChange }),
                _react2['default'].createElement(_Clock2['default'], {
                    time: time,
                    mode: mode,
                    begin: begin,
                    end: end,
                    onChange: this.onTimeChange })
            );
        };

        return TimePickerPanel;
    }(_react.Component);

    exports['default'] = TimePickerPanel;


    TimePickerPanel.displayName = 'TimePickerPanel';

    TimePickerPanel.defaultProps = {
        time: (0, _moment2['default'])().millisecond(0).seconds(0).toDate(),
        mode: 'hour'
    };

    TimePickerPanel.propTypes = {
        time: _react.PropTypes.instanceOf(Date),
        mode: _react.PropTypes.oneOf(['hour', 'minute']),
        begin: _react.PropTypes.instanceOf(Date),
        end: _react.PropTypes.instanceOf(Date),
        format: _react.PropTypes.string,
        onChange: _react.PropTypes.func.isRequired
    };
});
//# sourceMappingURL=Panel.js.map
