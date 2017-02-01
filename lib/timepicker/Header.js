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
        global.Header = mod.exports;
    }
})(this, function (exports, _react, _moment, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _moment2 = babelHelpers.interopRequireDefault(_moment);

    /**
     * @file melon/TimePickerHeader
     * @author cxtom(cxtom2008@qq.com)
     */

    var cx = (0, _cxBuilder.create)('TimePickerHeader');

    var TimePickerHeader = function (_Component) {
        babelHelpers.inherits(TimePickerHeader, _Component);

        function TimePickerHeader() {
            babelHelpers.classCallCheck(this, TimePickerHeader);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        TimePickerHeader.prototype.render = function render() {

            var props = this.props;

            var time = props.time,
                mode = props.mode;

            var timeMoment = (0, _moment2['default'])(time);

            var selected = mode === 'hour';

            var hour = (0, _moment2['default'])(time).hour();
            var isAfternoon = false;

            if (hour > 12 || hour === 0) {
                hour = hour === 0 ? 12 : hour - 12;
                isAfternoon = true;
            }

            return _react2['default'].createElement(
                'div',
                { className: cx(props).build() },
                _react2['default'].createElement(
                    'div',
                    { className: cx.getPartClassName('time') },
                    _react2['default'].createElement(
                        'span',
                        {
                            onClick: selected && props.onModeChange ? null : function () {
                                props.onModeChange({ mode: 'hour' });
                            },
                            className: cx().part('time-hour').addStates({ selected: selected }).build() },
                        (0, _moment2['default'])(hour + '', 'h').format('hh')
                    ),
                    _react2['default'].createElement(
                        'span',
                        null,
                        ':'
                    ),
                    _react2['default'].createElement(
                        'span',
                        {
                            onClick: !selected && props.onModeChange ? null : function () {
                                props.onModeChange({ mode: 'minute' });
                            },
                            className: cx().part('time-minute').addStates({ selected: !selected }).build() },
                        timeMoment.format('mm')
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { className: cx.getPartClassName('apm') },
                    _react2['default'].createElement(
                        'span',
                        {
                            onClick: !isAfternoon && props.onChange ? null : function () {
                                props.onChange({ time: (0, _moment2['default'])(time).subtract(12, 'h').toDate(), isModeChange: false });
                            },
                            className: cx().part('apm-am').addStates({ selected: !isAfternoon }).build() },
                        'AM'
                    ),
                    _react2['default'].createElement(
                        'span',
                        {
                            onClick: isAfternoon && props.onChange ? null : function () {
                                props.onChange({ time: (0, _moment2['default'])(time).add(12, 'h').toDate(), isModeChange: false });
                            },
                            className: cx().part('apm-pm').addStates({ selected: isAfternoon }).build() },
                        'PM'
                    )
                )
            );
        };

        return TimePickerHeader;
    }(_react.Component);

    exports['default'] = TimePickerHeader;


    TimePickerHeader.displayName = 'TimePickerHeader';

    TimePickerHeader.defaultProps = {
        time: (0, _moment2['default'])().millisecond(0).seconds(0).toDate(),
        mode: 'hour'
    };

    TimePickerHeader.propTypes = {
        time: _react.PropTypes.instanceOf(Date),
        mode: _react.PropTypes.oneOf(['hour', 'minute']),
        onModeChange: _react.PropTypes.func
    };
});
//# sourceMappingURL=Header.js.map
