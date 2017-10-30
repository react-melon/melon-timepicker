/**
 * @file TimePicker ClockItem spec
 * @author cxtom2008@gmail.com
 */

import React from 'react';
import moment from 'moment';
import {shallow} from 'enzyme';
import ClockItem from '../../src/timepicker/ClockItem';

describe('ClockItem', () => {

    it('mode hour', () => {
        let wrapper = shallow(
            <ClockItem
                time={moment('10:20:00', 'HH:mm:ss').toDate()}
                mode="hour" />
        );
        let x = 6.125 * Math.sin(30 * 10 * Math.PI / 180);
        let y = -6.125 * Math.cos(30 * 10 * Math.PI / 180);
        expect(wrapper.hasClass('ui-time-picker-clock-item')).toBe(true);
        expect(wrapper.prop('style')).toEqual({
            transform: `translate(${x}em, ${y}em)`,
            msTransform: `translate(${x}em, ${y}em)`,
            WebkitTransform: `translate(${x}em, ${y}em)`,
            MozTransform: `translate(${x}em, ${y}em)`
        });
        expect(wrapper.text()).toBe('10');
    });

    it('mode minute', () => {
        let wrapper = shallow(
            <ClockItem
                time={moment('10:20:00', 'HH:mm:ss').toDate()}
                mode="minute" />
        );
        let x = 6.125 * Math.sin(30 * 4 * Math.PI / 180);
        let y = -6.125 * Math.cos(30 * 4 * Math.PI / 180);
        expect(wrapper.prop('style')).toEqual({
            transform: `translate(${x}em, ${y}em)`,
            msTransform: `translate(${x}em, ${y}em)`,
            WebkitTransform: `translate(${x}em, ${y}em)`,
            MozTransform: `translate(${x}em, ${y}em)`
        });
        expect(wrapper.text()).toBe('20');
    });

});
