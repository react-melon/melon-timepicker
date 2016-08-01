/**
 * @file TimePicker ClockItem spec
 * @author cxtom2008@gmail.com
 */

import React from 'react';
import moment from 'moment';
import {createRenderer} from 'react-addons-test-utils';

import ClockHand from '../../src/timepicker/ClockHand';

describe('ClockHand', () => {

    let renderer;

    beforeEach(() => {
        renderer = createRenderer();
    });

    it('mode hour', () => {
        renderer.render(
            <ClockHand
                time={moment('10:20:00', 'HH:mm:ss').toDate()}
                mode="hour" />
        );
        let actualElement = renderer.getRenderOutput();
        let deg = (180 + 30 * 10) % 360;
        let expectedElement = (
            <div className="ui-time-picker-clock-hand" style={{
                transform: `translate(-50%, 0) rotate(${deg}deg)`,
                msTransform: `translate(-50%, 0) rotate(${deg}deg)`,
                WebkitTransform: `translate(-50%, 0) rotate(${deg}deg)`,
                MozTransform: `translate(-50%, 0) rotate(${deg}deg)`
            }}>
                <div className="ui-time-picker-clock-hand-end" />
            </div>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

    it('mode minute', () => {
        renderer.render(
            <ClockHand
                time={moment('10:21:00', 'HH:mm:ss').toDate()}
                mode="minute" />
        );
        let actualElement = renderer.getRenderOutput();
        let deg = (180 + 6 * 21) % 360;
        let expectedElement = (
            <div className="ui-time-picker-clock-hand variant-end" style={{
                transform: `translate(-50%, 0) rotate(${deg}deg)`,
                msTransform: `translate(-50%, 0) rotate(${deg}deg)`,
                WebkitTransform: `translate(-50%, 0) rotate(${deg}deg)`,
                MozTransform: `translate(-50%, 0) rotate(${deg}deg)`
            }}>
                <div className="ui-time-picker-clock-hand-end" />
            </div>
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

});
