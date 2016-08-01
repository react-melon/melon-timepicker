/**
 * @file TimePicker ClockItem spec
 * @author cxtom2008@gmail.com
 */

import React from 'react';
import moment from 'moment';
import {createRenderer} from 'react-addons-test-utils';

import ClockItem from '../../src/timepicker/ClockItem';

describe('ClockItem', () => {

    let renderer;

    beforeEach(() => {
        renderer = createRenderer();
    });

    it('mode hour', () => {
        renderer.render(
            <ClockItem
                time={moment('10:20:00', 'HH:mm:ss').toDate()}
                mode="hour" />
        );
        let actualElement = renderer.getRenderOutput();
        let x = 6.125 * Math.sin(30 * 10 * Math.PI / 180);
        let y = -6.125 * Math.cos(30 * 10 * Math.PI / 180);
        let expectedElement = (
            <span className="ui-time-picker-clock-item" style={{
                transform: `translate(${x}em, ${y}em)`,
                msTransform: `translate(${x}em, ${y}em)`,
                WebkitTransform: `translate(${x}em, ${y}em)`,
                MozTransform: `translate(${x}em, ${y}em)`
            }}>
                10
            </span>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

    it('mode minute', () => {
        renderer.render(
            <ClockItem
                time={moment('10:20:00', 'HH:mm:ss').toDate()}
                mode="minute" />
        );
        let actualElement = renderer.getRenderOutput();
        let x = 6.125 * Math.sin(30 * 4 * Math.PI / 180);
        let y = -6.125 * Math.cos(30 * 4 * Math.PI / 180);
        let expectedElement = (
            <span className="ui-time-picker-clock-item" style={{
                transform: `translate(${x}em, ${y}em)`,
                msTransform: `translate(${x}em, ${y}em)`,
                WebkitTransform: `translate(${x}em, ${y}em)`,
                MozTransform: `translate(${x}em, ${y}em)`
            }}>
                20
            </span>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

});
