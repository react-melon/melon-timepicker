(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'moment', 'melon-core/classname/cxBuilder', 'melon-core/util/array', 'melon/common/util/dom', './ClockItem', './ClockHand', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('moment'), require('melon-core/classname/cxBuilder'), require('melon-core/util/array'), require('melon/common/util/dom'), require('./ClockItem'), require('./ClockHand'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.moment, global.cxBuilder, global.array, global.dom, global.ClockItem, global.ClockHand, global.babelHelpers);
        global.Clock = mod.exports;
    }
})(this, function (exports, _react, _moment, _cxBuilder, _array, _dom, _ClockItem, _ClockHand, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _moment2 = babelHelpers.interopRequireDefault(_moment);

    var _ClockItem2 = babelHelpers.interopRequireDefault(_ClockItem);

    var _ClockHand2 = babelHelpers.interopRequireDefault(_ClockHand);

    /**
     * @file melon/TimePickerClock
     * @author cxtom(cxtom2008@qq.com)
     */

    var cx = (0, _cxBuilder.create)('TimePickerClock');
    var PI = Math.PI,
        atan = Math.atan;

    var TimePickerClock = function (_Component) {
        babelHelpers.inherits(TimePickerClock, _Component);

        function TimePickerClock() {
            babelHelpers.classCallCheck(this, TimePickerClock);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

            _this.onMouseDown = _this.onMouseDown.bind(_this);
            _this.onMouseUp = _this.onMouseUp.bind(_this);

            // 限流
            _this.onMouseChange = function () {

                var handler = _this.onMouseChange;

                return function (e) {
                    clearTimeout(_this.mouseChangeTimer);
                    _this.mouseChangeTimer = setTimeout(handler.bind(_this, e), 5);
                };
            }();
            return _this;
        }

        /**
         * react 组件生命周期——判断是否需要更新组件，用来做性能优化
         *
         * @public
         * @params {Object} nextProps 更新的属性
         * @return {boolean} 是否需要更新
         */


        TimePickerClock.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            var _props = this.props,
                time = _props.time,
                mode = _props.mode,
                begin = _props.begin,
                end = _props.end;


            return !(0, _moment2['default'])(time).isSame(nextProps.time) || mode !== nextProps.mode || !(0, _moment2['default'])(begin).isSame(nextProps.begin) || !(0, _moment2['default'])(end).isSame(nextProps.end);
        };

        TimePickerClock.prototype.componentWillUnmount = function componentWillUnmount() {
            clearTimeout(this.mouseChangeTimer);
            this.mouseChangeTimer = null;
        };

        TimePickerClock.prototype.onMouseDown = function onMouseDown(e) {

            if (this.props.mode === 'minute') {
                this.refs.main.addEventListener('mousemove', this.onMouseChange);
                document.addEventListener('mouseup', this.onMouseUp);
            } else {
                this.refs.main.addEventListener('mouseup', this.onMouseChange);
            }
        };

        TimePickerClock.prototype.onMouseUp = function onMouseUp(e) {

            if (this.props.mode === 'minute') {
                this.onMouseChange(e);
                this.refs.main.removeEventListener('mousemove', this.onMouseChange);
                document.removeEventListener('mouseup', this.onMouseUp);
            } else {
                this.refs.main.removeEventListener('mouseup', this.onMouseChange);
            }
        };

        TimePickerClock.prototype.onMouseChange = function onMouseChange(_ref) {
            var pageX = _ref.pageX,
                pageY = _ref.pageY;


            var mainPosition = (0, _dom.getPosition)(this.refs.main);
            var radius = mainPosition.width / 2;

            var pos = {
                x: pageX - mainPosition.left - radius,
                y: pageY - mainPosition.top - radius
            };

            var deg = void 0;

            if (pos.y === 0) {
                return;
            }

            if (pos.x >= 0 && pos.y < 0) {
                deg = -180 * atan(pos.x / pos.y) / PI;
            } else if (pos.x >= 0 && pos.y > 0) {
                deg = 180 - 180 * atan(pos.x / pos.y) / PI;
            } else if (pos.x < 0 && pos.y > 0) {
                deg = 180 - 180 * atan(pos.x / pos.y) / PI;
            } else if (pos.x < 0 && pos.y < 0) {
                deg = 360 - 180 * atan(pos.x / pos.y) / PI;
            }

            var _props2 = this.props,
                time = _props2.time,
                mode = _props2.mode;


            var single = mode === 'minute' ? 6 : 30;
            var number = Math.round(deg / single);

            if (mode === 'hour') {
                // number为0表示选择了上午12点
                number = number === 0 ? 12 : number;
                // 下午的时间加12
                number = time.getHours() > 12 ? number + 12 : number;
                // number为24时的特殊处理，日期如果不改为0，日期会加1
                number = number === 24 ? 0 : number;
            }

            var newTime = (0, _moment2['default'])(time)[mode](number).toDate();

            if ((0, _moment2['default'])(newTime).isSame(time)) {
                return;
            }

            this.props.onChange({
                time: newTime
            });
        };

        TimePickerClock.prototype.renderItems = function renderItems() {
            var _props3 = this.props,
                time = _props3.time,
                mode = _props3.mode,
                begin = _props3.begin,
                end = _props3.end;


            var items = mode === 'hour' ? (0, _array.range)(1, 13) : (0, _array.range)(0, 60, 5);

            return items.map(function (number) {

                var timeMoment = void 0;
                var selected = false;
                if (mode === 'hour') {
                    var hour = (0, _moment2['default'])(time).hour();
                    hour = hour === 0 ? 12 : hour;
                    selected = (hour > 12 ? hour - 12 : hour) === number;
                    var itemHour = hour > 12 ? number + 12 : number;
                    timeMoment = (0, _moment2['default'])(time).hour(itemHour);
                } else {
                    selected = (0, _moment2['default'])(time).minute() === number;
                    timeMoment = (0, _moment2['default'])(time).minute(number);
                }

                var disabled = false;
                disabled = begin ? timeMoment.isBefore(begin) : false;
                disabled = end ? timeMoment.isAfter(end) : false;

                return _react2['default'].createElement(_ClockItem2['default'], {
                    key: mode + number,
                    time: timeMoment.toDate(),
                    mode: mode,
                    selected: selected,
                    disabled: disabled });
            });
        };

        TimePickerClock.prototype.render = function render() {
            var _props4 = this.props,
                time = _props4.time,
                mode = _props4.mode,
                onChange = _props4.onChange;


            var className = cx(this.props).addVariants(mode).build();

            return _react2['default'].createElement(
                'div',
                { className: className },
                _react2['default'].createElement(
                    'div',
                    {
                        className: cx.getPartClassName('main'),
                        ref: 'main',
                        onMouseDown: this.onMouseDown },
                    _react2['default'].createElement(_ClockHand2['default'], {
                        time: time,
                        mode: mode,
                        onChange: onChange }),
                    this.renderItems()
                )
            );
        };

        return TimePickerClock;
    }(_react.Component);

    exports['default'] = TimePickerClock;


    TimePickerClock.displayName = 'TimePickerClock';

    TimePickerClock.propTypes = {
        time: _react.PropTypes.instanceOf(Date),
        mode: _react.PropTypes.oneOf(['hour', 'minute']),
        begin: _react.PropTypes.instanceOf(Date),
        end: _react.PropTypes.instanceOf(Date),
        onChange: _react.PropTypes.func.isRequired
    };
});
//# sourceMappingURL=Clock.js.map
