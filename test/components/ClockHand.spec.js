/**
 * @file TimePicker ClockItem spec
 * @author cxtom2008@gmail.com
 */

import React from 'react';
import moment from 'moment';
import {shallow} from 'enzyme';
import ClockHand from '../../src/timepicker/ClockHand';

describe('ClockHand', () => {

    it('mode hour', () => {

        let deg = (180 + 30 * 10) % 360;
        let wrapper = shallow(
            <ClockHand
                time={moment('10:20:00', 'HH:mm:ss').toDate()}
                mode="hour" />
        );
        expect(wrapper.hasClass('ui-time-picker-clock-hand')).toBe(true);
        expect(wrapper.prop('style')).toEqual({
            transform: `translate(-50%, 0) rotate(${deg}deg)`,
            msTransform: `translate(-50%, 0) rotate(${deg}deg)`,
            WebkitTransform: `translate(-50%, 0) rotate(${deg}deg)`,
            MozTransform: `translate(-50%, 0) rotate(${deg}deg)`
        });
        expect(wrapper.children().at(0).hasClass('ui-time-picker-clock-hand-end')).toBe(true);
    });

    it('mode minute', () => {
        let deg = (180 + 6 * 21) % 360;
        let wrapper = shallow(
            <ClockHand
                time={moment('10:21:00', 'HH:mm:ss').toDate()}
                mode="minute" />
        );
        expect(wrapper.hasClass('variant-end')).toBe(true);
        expect(wrapper.prop('style')).toEqual({
            transform: `translate(-50%, 0) rotate(${deg}deg)`,
            msTransform: `translate(-50%, 0) rotate(${deg}deg)`,
            WebkitTransform: `translate(-50%, 0) rotate(${deg}deg)`,
            MozTransform: `translate(-50%, 0) rotate(${deg}deg)`
        });
        expect(wrapper.children().at(0).hasClass('ui-time-picker-clock-hand-end')).toBe(true);
    });

});
