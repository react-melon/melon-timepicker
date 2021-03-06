/**
 * @file TimePicker Clock spec
 * @author cxtom2008@gmail.com
 */

/* eslint-disable max-nested-callbacks */

import '../../src/index.styl';

import React from 'react';
import {findDOMNode} from 'react-dom';
import moment from 'moment';
import TestUtils from 'react-dom/test-utils';

import {mount} from 'enzyme';

import Clock from '../../src/timepicker/Clock';
import ClockItem from '../../src/timepicker/ClockItem';

import {getPosition} from 'melon/common/util/dom';


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
    });

    it('mouseDown', () => {
        const main = document.querySelector('.ui-time-picker-clock-main');
        const mouseDownSpy = spyOn(main, 'addEventListener');
        clockItems.at(0).simulate('mousedown');
        expect(mouseDownSpy).toHaveBeenCalled();
    });

    it('change hour', function () {

        let item = findDOMNode(clockItems.at(0).instance());
        component.instance().onMouseChange(nativeMouseData(item));

        expect(changeSpy)
            .toHaveBeenCalledWith({
                time: moment('01:00:00', 'HH:mm:ss').toDate()
            });

        component.instance().onMouseUp();
        changeSpy.calls.reset();

        item = findDOMNode(clockItems.at(3).instance());
        component.instance().onMouseChange(nativeMouseData(item));

        expect(changeSpy)
            .toHaveBeenCalledWith({
                time: moment('04:00:00', 'HH:mm:ss').toDate()
            });

        component.instance().onMouseUp();
        changeSpy.calls.reset();

        item = findDOMNode(clockItems.at(7).instance());
        component.instance().onMouseChange(nativeMouseData(item));

        expect(changeSpy)
            .toHaveBeenCalledWith({
                time: moment('08:00:00', 'HH:mm:ss').toDate()
            });

        component.instance().onMouseUp();
        changeSpy.calls.reset();

        item = findDOMNode(clockItems.at(10).instance());
        component.instance().onMouseChange(nativeMouseData(item));

        expect(changeSpy)
            .toHaveBeenCalledWith({
                time: moment('11:00:00', 'HH:mm:ss').toDate()
            });

        component.instance().onMouseUp();

    });

    it('change hour pm', () => {
        component.setProps({time: moment('13:00:00', 'HH:mm:ss').toDate()});

        expect(component.prop('time').getHours()).toBe(13);
        let item = findDOMNode(clockItems.at(3).instance());
        component.instance().onMouseChange(nativeMouseData(item));

        expect(changeSpy).toHaveBeenCalledWith({time: moment('16:00:00', 'HH:mm:ss').toDate()});
        component.instance().onMouseUp();
        changeSpy.calls.reset();

        item = findDOMNode(clockItems.at(11).instance());
        component.instance().onMouseChange(nativeMouseData(item));

        expect(changeSpy).toHaveBeenCalledWith({time: moment('00:00:00', 'HH:mm:ss').toDate()});
        component.instance().onMouseUp();
        changeSpy.calls.reset();

        item = findDOMNode(clockItems.at(0).instance());
        component.instance().onMouseChange(nativeMouseData(item));

        expect(changeSpy.calls.count()).toBe(0);
        component.instance().onMouseUp();
    });

    it('change minute', function () {
        component.setProps({
            time: moment('05:10:00', 'HH:mm:ss').toDate(),
            mode: 'minute'
        });

        let item = findDOMNode(component.find(ClockItem).at(1).instance());
        component.find(ClockItem).at(1).simulate('mousedown');
        component.instance().onMouseUp(nativeMouseData(item));
        expect(changeSpy).toHaveBeenCalledWith({time: moment('05:05:00', 'HH:mm:ss').toDate()});
        changeSpy.calls.reset();

        component.instance().onMouseUp(nativeMouseData(item));
        expect(changeSpy).not.toHaveBeenCalledWith();

        item = findDOMNode(component.find(ClockItem).at(0).instance());
        component.instance().onMouseUp(nativeMouseData(item));
        expect(changeSpy).toHaveBeenCalledWith({
            time: moment('05:00:00', 'HH:mm:ss').toDate()
        });
        changeSpy.calls.reset();

        // 点在了中心点
        item = component.find('.ui-time-picker-clock-main').at(0).instance();
        component.instance().onMouseUp(nativeMouseData(item));
        expect(changeSpy).not.toHaveBeenCalledWith();
    });

});
