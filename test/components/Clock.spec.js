/**
 * @file TimePicker Clock spec
 * @author cxtom2008@gmail.com
 */

/* eslint-disable max-nested-callbacks */

import '../../src/index.styl';

import React from 'react';
import {findDOMNode} from 'react-dom';
import moment from 'moment';
import TestUtils from 'react-addons-test-utils';

import {mount} from 'enzyme';

import Clock from '../../src/timepicker/Clock';
import ClockItem from '../../src/timepicker/ClockItem';

import {getPosition} from 'melon/common/util/dom';
import then from '../then';


function nativeMouseData(node) {
    const pos = getPosition(node);
    return {
        pageX: pos.left + pos.width / 2,
        pageY: pos.top + pos.height / 2
    };
}

describe('Clock', function () {

    let changeSpy;
    let component;
    let clockItems;
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        changeSpy = jasmine.createSpy('onChange');
        component = mount(
            <Clock
                time={moment('05:00:00', 'HH:mm:ss').toDate()}
                mode="hour"
                onChange={changeSpy} />,
            {
                attachTo: container
            }
        );
        clockItems = component.find(ClockItem);
    });

    afterEach(() => {
        changeSpy.calls.reset();
        component.unmount();
        component = null;
        document.body.removeChild(container);
        container = null;
    });

    it('dom', function () {
        expect(clockItems.length).toEqual(12);
        const item = findDOMNode(clockItems.get(1));
        expect(TestUtils.isDOMComponent(item)).toBeTruthy();

    });

    it('mouseDown', () => {
        const main = document.querySelector('.ui-time-picker-clock-main');
        expect(TestUtils.isDOMComponent(main)).toBeTruthy();
        const mouseDownSpy = spyOn(main, 'addEventListener');
        clockItems.at(0).simulate('mousedown');
        expect(mouseDownSpy).toHaveBeenCalled();
    });

    it('change hour', function (done) {
        let item = findDOMNode(clockItems.get(0));
        component.instance().onMouseChange(nativeMouseData(item));

        then(() => {
            expect(changeSpy).toHaveBeenCalledWith({time: moment('01:00:00', 'HH:mm:ss').toDate()});
            component.instance().onMouseUp();
            changeSpy.calls.reset();

            item = findDOMNode(clockItems.get(3));
            component.instance().onMouseChange(nativeMouseData(item));
        }, 20).then(() => {
            expect(changeSpy).toHaveBeenCalledWith({time: moment('04:00:00', 'HH:mm:ss').toDate()});
            component.instance().onMouseUp();
            changeSpy.calls.reset();

            item = findDOMNode(clockItems.get(7));
            component.instance().onMouseChange(nativeMouseData(item));
        }, 40).then(() => {
            expect(changeSpy).toHaveBeenCalledWith({time: moment('08:00:00', 'HH:mm:ss').toDate()});
            component.instance().onMouseUp();
            changeSpy.calls.reset();

            item = findDOMNode(clockItems.get(10));
            component.instance().onMouseChange(nativeMouseData(item));
        }, 60).then(() => {
            expect(changeSpy).toHaveBeenCalledWith({time: moment('11:00:00', 'HH:mm:ss').toDate()});
            component.instance().onMouseUp();
            changeSpy.calls.reset();

            item = findDOMNode(clockItems.get(11));
            component.instance().onMouseChange(nativeMouseData(item));
        }, 80).then(() => {
            expect(changeSpy).toHaveBeenCalledWith({time: moment('12:00:00', 'HH:mm:ss').toDate()});
            component.instance().onMouseUp();
            done();
        }, 120);
    });

    it('change hour pm', done => {
        component.setProps({time: moment('13:00:00', 'HH:mm:ss').toDate()});
        let item;

        then(() => {
            expect(component.prop('time').getHours()).toBe(13);
            item = findDOMNode(clockItems.get(3));
            component.instance().onMouseChange(nativeMouseData(item));
        }, 20).then(() => {
            expect(changeSpy).toHaveBeenCalledWith({time: moment('16:00:00', 'HH:mm:ss').toDate()});
            component.instance().onMouseUp();
            changeSpy.calls.reset();

            item = findDOMNode(clockItems.get(11));
            component.instance().onMouseChange(nativeMouseData(item));
        }, 40).then(() => {
            expect(changeSpy).toHaveBeenCalledWith({time: moment('00:00:00', 'HH:mm:ss').toDate()});
            component.instance().onMouseUp();
            changeSpy.calls.reset();

            item = findDOMNode(clockItems.get(0));
            component.instance().onMouseChange(nativeMouseData(item));
        }, 60).then(() => {
            expect(changeSpy.calls.count()).toBe(0);
            component.instance().onMouseUp();
            done();
        }, 80);
    });

    it('change minute', function (done) {
        component.setProps({mode: 'minute'});
        component.setProps({begin: moment('05:00:00', 'HH:mm:ss').toDate()});
        component.setProps({end: moment('05:45:00', 'HH:mm:ss').toDate()});

        let item;

        then(() => {
            item = findDOMNode(component.find(ClockItem).get(1));
            component.find(ClockItem).at(1).simulate('mousedown');
            component.instance().onMouseUp(nativeMouseData(item));
        }).then(() => {
            expect(changeSpy).toHaveBeenCalledWith({time: moment('05:05:00', 'HH:mm:ss').toDate()});
            changeSpy.calls.reset();
            component.instance().onMouseUp(nativeMouseData(item));
        }, 15).then(() => {
            expect(changeSpy).not.toHaveBeenCalledWith();
            done();
        }, 25);
    });


});
