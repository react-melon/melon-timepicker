(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'moment', 'melon-core/InputComponent', 'melon-core/classname/cxBuilder', './util', 'melon/Icon', 'melon/Confirm', './timepicker/Panel', 'lodash/omit', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('moment'), require('melon-core/InputComponent'), require('melon-core/classname/cxBuilder'), require('./util'), require('melon/Icon'), require('melon/Confirm'), require('./timepicker/Panel'), require('lodash/omit'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.moment, global.InputComponent, global.cxBuilder, global.util, global.Icon, global.Confirm, global.Panel, global.omit, global.babelHelpers);
        global.index = mod.exports;
    }
})(this, function (exports, _react, _moment, _InputComponent2, _cxBuilder, _util, _Icon, _Confirm, _Panel, _omit, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _moment2 = babelHelpers.interopRequireDefault(_moment);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var Util = babelHelpers.interopRequireWildcard(_util);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _Confirm2 = babelHelpers.interopRequireDefault(_Confirm);

    var _Panel2 = babelHelpers.interopRequireDefault(_Panel);

    var _omit2 = babelHelpers.interopRequireDefault(_omit);

    /**
     * @file melon/TimePicker
     * @author cxtom <cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('TimePicker');

    /**
     * melon/TimePicker
     *
     * @extends {React.Component}
     * @class
     */

    var TimePicker = function (_InputComponent) {
        babelHelpers.inherits(TimePicker, _InputComponent);

        /**
         * 构造函数
         *
         * @public
         * @constructor
         * @param {*} props 属性
         * @param {*} context 上下文
         */
        function TimePicker(props, context) {
            babelHelpers.classCallCheck(this, TimePicker);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            var defaultValue = props.defaultValue,
                value = props.value,
                begin = props.begin,
                end = props.end;


            _this.onLabelClick = _this.onLabelClick.bind(_this);
            _this.onConfirm = _this.onConfirm.bind(_this);
            _this.onCancel = _this.onCancel.bind(_this);
            _this.onTimeChange = _this.onTimeChange.bind(_this);

            var time = value === void 0 ? defaultValue : value;

            var tiemObj = time && _this.parseValue(time);
            var beginObj = begin && _this.parseValue(begin);
            var endObj = end && _this.parseValue(end);

            /**
             * 初始状态
             *
             * @private
             * @type {Object}
             */
            _this.state = babelHelpers['extends']({}, _this.state, {

                value: _this.stringifyValue(time && Util.closest(tiemObj, beginObj, endObj)),

                // 缓存用户在 confirm 前的选中值
                time: time ? _this.parseValue(Util.closest(tiemObj, beginObj, endObj)) : void 0,

                // 是否打开选择窗
                open: false
            });

            return _this;
        }

        /**
         * react生命周期，组件将更新时触发，用于value和date的同步
         *
         * @param {Object} _ 属性
         * @param {Object} nextState 状态
         */


        TimePicker.prototype.componentWillUpdate = function componentWillUpdate(_, nextState) {
            var time = this.parseValue(nextState.value);
            if (this.state.value !== nextState.value && (time === void 0 || nextState.time === void 0 || !(0, _moment2['default'])(time).isSame(nextState.time, 'minute') || !(0, _moment2['default'])(time).isSame(nextState.time, 'hour'))) {
                this.setState({
                    date: this.parseValue(nextState.value)
                });
            }
        };

        TimePicker.prototype.stringifyValue = function stringifyValue(time) {

            if (typeof time === 'string' || time == null) {
                return time;
            }

            var timeFormat = this.props.timeFormat;

            return (0, _moment2['default'])(time).format(timeFormat);
        };

        TimePicker.prototype.parseValue = function parseValue(date) {

            if (typeof date !== 'string') {
                return date;
            }

            return (0, _moment2['default'])(date, this.props.timeFormat).toDate();
        };

        TimePicker.prototype.onLabelClick = function onLabelClick() {

            this.setState({ open: true });

            var onFocus = this.props.onFocus;

            if (onFocus) {
                onFocus({
                    type: 'focus',
                    target: this
                });
            }
        };

        TimePicker.prototype.onBlur = function onBlur() {

            var onBlur = this.props.onBlur;

            if (onBlur) {
                onBlur({
                    type: 'blur',
                    target: this
                });
            }
        };

        TimePicker.prototype.onConfirm = function onConfirm() {
            var _this2 = this;

            var _state = this.state,
                value = _state.value,
                time = _state.time;


            value = this.parseValue(value);

            var valueMoment = (0, _moment2['default'])(value, this.timeFormat);
            var timeMoment = (0, _moment2['default'])(time);

            if (value !== '' && valueMoment.get('hour') === timeMoment.get('hour') && valueMoment.get('minute') === timeMoment.get('minute')) {
                this.setState({ open: false });
            }

            this.setState({ open: false }, function () {

                _InputComponent.prototype.onChange.call(_this2, {
                    type: 'change',
                    target: _this2,
                    value: _this2.stringifyValue(time)
                });

                _this2.onBlur();
            });
        };

        TimePicker.prototype.onCancel = function onCancel() {
            var _this3 = this;

            this.setState({ open: false }, function () {
                _this3.onBlur();
            });
        };

        TimePicker.prototype.onTimeChange = function onTimeChange(_ref) {
            var time = _ref.time;

            this.setState({ time: time });
        };

        TimePicker.prototype.renderHiddenInput = function renderHiddenInput() {
            var _props = this.props,
                name = _props.name,
                value = _props.value;


            return name ? _react2['default'].createElement('input', {
                name: name,
                type: 'hidden',
                value: value }) : null;
        };

        TimePicker.prototype.render = function render() {
            var state = this.state,
                props = this.props;
            var disabled = props.disabled,
                readOnly = props.readOnly,
                placeholder = props.placeholder,
                timeFormat = props.timeFormat,
                labelFormat = props.labelFormat,
                others = babelHelpers.objectWithoutProperties(props, ['disabled', 'readOnly', 'placeholder', 'timeFormat', 'labelFormat']);
            var begin = props.begin,
                end = props.end;


            begin = begin ? this.parseValue(begin) : null;
            end = end ? this.parseValue(end) : null;

            var value = state.value,
                open = state.open;


            var className = cx(props).addStates({ focus: open }).addStates(this.getStyleStates()).build();

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, (0, _omit2['default'])(others, ['name']), { className: className }),
                this.renderHiddenInput(),
                _react2['default'].createElement(
                    'label',
                    {
                        onClick: disabled || readOnly ? null : this.onLabelClick,
                        className: cx.getPartClassName('label') },
                    value ? (0, _moment2['default'])(value, timeFormat).format(labelFormat) : _react2['default'].createElement(
                        'span',
                        { className: cx.getPartClassName('label-placeholder') },
                        placeholder
                    ),
                    _react2['default'].createElement(_Icon2['default'], { icon: 'expand-more' })
                ),
                _react2['default'].createElement(
                    _Confirm2['default'],
                    {
                        open: open,
                        variants: ['timepicker'],
                        onConfirm: this.onConfirm,
                        onCancel: this.onCancel,
                        width: 'adaptive',
                        buttonVariants: ['secondery', 'timepicker'] },
                    _react2['default'].createElement(_Panel2['default'], {
                        time: this.state.time,
                        begin: begin,
                        end: end,
                        format: timeFormat,
                        onChange: this.onTimeChange })
                )
            );
        };

        return TimePicker;
    }(_InputComponent3['default']);

    exports['default'] = TimePicker;


    TimePicker.displayName = 'TimePicker';

    TimePicker.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        timeFormat: 'HH:mm:ss',
        labelFormat: 'HH:mm',
        placeholder: '请选择'
    });

    TimePicker.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        placeholder: _react.PropTypes.string,
        timeFormat: _react.PropTypes.string,
        labalFormat: _react.PropTypes.string,
        end: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]),
        begin: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string])
    });

    TimePicker.childContextTypes = _InputComponent3['default'].childContextTypes;
    TimePicker.contextTypes = _InputComponent3['default'].contextTypes;
});
//# sourceMappingURL=index.js.map
