(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'moment', 'melon-core/classname/cxBuilder', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('moment'), require('melon-core/classname/cxBuilder'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.moment, global.cxBuilder, global.babelHelpers);
        global.ClockItem = mod.exports;
    }
})(this, function (exports, _react, _moment, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _moment2 = babelHelpers.interopRequireDefault(_moment);

    /**
     * @file melon/TimePickerClockItem
     * @author cxtom(cxtom2008@qq.com)
     */

    var cx = (0, _cxBuilder.create)('TimePickerClockItem');

    var PI = Math.PI;

    /**
     * melon/TimePickerClockItem
     *
     * @extends {React.Component}
     * @class
     */

    var TimePickerClockItem = function (_Component) {
        babelHelpers.inherits(TimePickerClockItem, _Component);

        function TimePickerClockItem() {
            babelHelpers.classCallCheck(this, TimePickerClockItem);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        TimePickerClockItem.prototype.getStyle = function getStyle() {
            var _props = this.props,
                time = _props.time,
                mode = _props.mode;


            var number = (0, _moment2['default'])(time)[mode]();
            var single = 30;

            if (mode === 'minute') {
                number = parseInt(number / 5, 10);
            }

            return ['Webkit', 'Moz', 'ms', ''].reduce(function (result, prefix) {
                var _babelHelpers$extends;

                var x = 6.125 * Math.sin(single * number * PI / 180);
                var y = -6.125 * Math.cos(single * number * PI / 180);

                return babelHelpers['extends']({}, result, (_babelHelpers$extends = {}, _babelHelpers$extends['' + prefix + (prefix ? 'T' : 't') + 'ransform'] = 'translate(' + x + 'em, ' + y + 'em)', _babelHelpers$extends));
            }, {});
        };

        TimePickerClockItem.prototype.render = function render() {
            var _props2 = this.props,
                selected = _props2.selected,
                time = _props2.time,
                mode = _props2.mode;


            var className = cx(this.props).addStates({ selected: selected }).build();

            return _react2['default'].createElement(
                'span',
                { className: className, style: this.getStyle() },
                (0, _moment2['default'])(time).format(mode === 'hour' ? 'hh' : 'mm')
            );
        };

        return TimePickerClockItem;
    }(_react.Component);

    exports['default'] = TimePickerClockItem;


    TimePickerClockItem.displayName = 'TimePickerClockItem';

    TimePickerClockItem.propTypes = {
        time: _react.PropTypes.instanceOf(Date).isRequired,
        mode: _react.PropTypes.oneOf(['hour', 'minute']).isRequired,
        selected: _react.PropTypes.bool,
        disabled: _react.PropTypes.bool,
        onClick: _react.PropTypes.func
    };
});
//# sourceMappingURL=ClockItem.js.map
