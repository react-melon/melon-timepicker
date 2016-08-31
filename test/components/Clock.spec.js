/**
 * @file TimePicker Clock spec
 * @author cxtom2008@gmail.com
 */

/* eslint-disable max-nested-callbacks */

import React from 'react';
import {findDOMNode} from 'react-dom';
import moment from 'moment';
import TestUtils, {Simulate} from 'react-addons-test-utils';

import Clock from '../../src/timepicker/Clock';
import ClockItem from '../../src/timepicker/ClockItem';

import domUtil from 'melon/common/util/dom';

function nativeMouseData(node) {
    const pos = domUtil.getPosition(node);
    return {
        pageX: pos.left + pos.width / 2,
        pageY: pos.top + pos.height / 2
    };
}

describe('Clock', function () {

    let changeSpy;
    let component;
    let clockItems;

    describe('mode hour', function () {

        beforeEach(() => {
            changeSpy = jasmine.createSpy('onChange');
            component = TestUtils.renderIntoDocument(
                <Clock
                    time={moment('5:10:00', 'HH:mm:ss').toDate()}
                    mode="hour"
                    onChange={changeSpy} />
            );
            clockItems = TestUtils.scryRenderedComponentsWithType(component, ClockItem);
        });

        afterEach(() => {
            changeSpy.calls.reset();
            component = null;
        });

        it('dom', function () {
            expect(clockItems.length).toEqual(12);
        });

        it('mouseDown', function () {
            const item = findDOMNode(clockItems[1]);
            const spy = spyOn(domUtil, 'on');
            Simulate.mouseDown(item, nativeMouseData(item));
            expect(spy.calls.count()).toBe(1);
        });
    });

    describe('mode minute', function () {

        beforeEach(() => {
            changeSpy = jasmine.createSpy('onChange');
            component = TestUtils.renderIntoDocument(
                <Clock
                    time={moment('5:10:00', 'HH:mm:ss').toDate()}
                    mode="minute"
                    onChange={changeSpy} />
            );
        });

        afterEach(() => {
            changeSpy.calls.reset();
            component = null;
        });

        it('dom', function () {
            expect(TestUtils.scryRenderedComponentsWithType(component, ClockItem).length).toEqual(12);
        });

    });




});
