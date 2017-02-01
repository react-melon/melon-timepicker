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

import Confirm from 'melon/Confirm';
import TimePicker from '../../src/TimePicker';
import Clock from '../../src/timepicker/Clock';
import ClockItem from '../../src/timepicker/ClockItem';

import {getPosition} from 'melon/common/util/dom';
import then from '../then';

describe('TimePicker', function () {

    let changeSpy;
    let component;
    let container;

    describe('base', () => {

        beforeEach(() => {
            container = document.createElement('div');
            document.body.appendChild(container);
            changeSpy = jasmine.createSpy('onChange');
            component = mount(
                <TimePicker />,
                {
                    attachTo: container
                }
            );
        });

        afterEach(() => {
            changeSpy.calls.reset();
            component.unmount();
            component = null;
            document.body.removeChild(container);
            container = null;
        });

        it('dom', function () {
            expect(component.find('.ui-time-picker-label').length).toBe(1);
            expect(component.find(Confirm).length).toBe(1);
            expect(component.find('input').length).toBe(0);

            component.setProps({name: 'test'});
            expect(component.find('input').length).toBe(1);
        });

    });

});
