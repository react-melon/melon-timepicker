/**
 * @file 工具函数
 * @author cxtom (cxtom2008@gmail.com)
 */

import moment from 'moment';

function getMinutes(time) {
    const timeMoment = moment(time);
    const hour = timeMoment.hour();
    const minute = timeMoment.minute();
    return hour * 60 + minute;
}

export function isBetween(time, begin, end) {

    const minutes = getMinutes(time);
    begin = begin ? getMinutes(begin) : 0;
    end = end ? getMinutes(end) : (24 * 60 - 1);

    return minutes >= begin && minutes <= end;
}

export function isSame(a, b) {
    return getMinutes(a) === getMinutes(b);
}

export function closest(time, begin, end) {
    const minutes = getMinutes(time);

    if (begin && minutes < getMinutes(begin)) {
        return begin;
    }
    if (end && minutes > getMinutes(end)) {
        return end;
    }
    return time;
}
