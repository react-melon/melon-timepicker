(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'moment', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('moment'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.moment, global.babelHelpers);
        global.util = mod.exports;
    }
})(this, function (exports, _moment, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.isBetween = isBetween;
    exports.isSame = isSame;
    exports.closest = closest;

    var _moment2 = babelHelpers.interopRequireDefault(_moment);

    /**
     * @file 工具函数
     * @author cxtom (cxtom2008@gmail.com)
     */

    function getMinutes(time) {
        var timeMoment = (0, _moment2['default'])(time);
        var hour = timeMoment.hour();
        var minute = timeMoment.minute();
        return hour * 60 + minute;
    }

    function isBetween(time, begin, end) {

        var minutes = getMinutes(time);
        begin = begin ? getMinutes(begin) : 0;
        end = end ? getMinutes(end) : 24 * 60 - 1;

        return minutes >= begin && minutes <= end;
    }

    function isSame(a, b) {
        return getMinutes(a) === getMinutes(b);
    }

    function closest(time, begin, end) {
        var minutes = getMinutes(time);

        if (begin && minutes < getMinutes(begin)) {
            return begin;
        }
        if (end && minutes > getMinutes(end)) {
            return end;
        }
        return time;
    }
});
//# sourceMappingURL=util.js.map
