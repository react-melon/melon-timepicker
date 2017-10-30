/**
 * @file TimePicker Clock spec
 * @author cxtom2008@gmail.com
 */

/* eslint-disable max-nested-callbacks */

import '../../src/index.styl';

import React from 'react';

import {mount} from 'enzyme';

import Confirm from 'melon/Confirm';
import TimePicker from '../../src/index';

import then from '../then';

describe('TimePicker', function () {

    let changeSpy;
    let component;

    beforeEach(() => {
        changeSpy = jasmine.createSpy('onChange');
        component = mount(
            <TimePicker />
        );
    });

    afterEach(() => {
        changeSpy.calls.reset();
        component.unmount();
        component = null;
    });

    it('dom', function () {
        expect(component.find('.ui-time-picker-label').length).toBe(1);
        expect(component.find(Confirm).length).toBe(1);
        expect(component.find('input').length).toBe(0);

        component.setProps({name: 'test'});
        expect(component.find('input').length).toBe(1);
    });

    it('focus & blur', done => {

        const focusSpy = jasmine.createSpy('focus');
        const blurSpy = jasmine.createSpy('blur');

        component.setProps({
            onFocus: focusSpy,
            onBlur: blurSpy
        });

        component.find('.ui-time-picker-label').at(0).simulate('click');

        then(() => {
            expect(component.state('open')).toBeTruthy();
            expect(focusSpy).toHaveBeenCalled();
            let buttons = document.querySelectorAll('.ui-button');
            expect(buttons.length).toBe(2);
            document.querySelector('.ui-button.variant-confirm').click();
        }).then(() => {
            expect(blurSpy).toHaveBeenCalled();
            expect(component.state('open')).toBeFalsy();
            blurSpy.calls.reset();
            component.find('.ui-time-picker-label').at(0).simulate('click');
        }).then(() => {
            let buttons = document.querySelectorAll('.ui-button');
            expect(buttons.length).toBe(2);
            document.querySelector('.ui-button.variant-cancel').click();
        }).then(() => {
            expect(blurSpy).toHaveBeenCalled();
            expect(component.state('open')).toBeFalsy();
            done();
        });
    });

    it('disabled', done => {
        const focusSpy = jasmine.createSpy('focus');

        component.setProps({
            disabled: true,
            onFocus: focusSpy
        });

        expect(component.children().at(0).hasClass('state-disabled')).toBeTruthy();

        component.find('.ui-time-picker-label').at(0).simulate('click');

        then(() => {
            expect(component.state('open')).toBeFalsy();
            expect(focusSpy).not.toHaveBeenCalled();
            done();
        });

    });

    it('readOnly', done => {
        const focusSpy = jasmine.createSpy('focus');

        component.setProps({
            readOnly: true,
            onFocus: focusSpy
        });

        expect(component.children().at(0).hasClass('state-read-only')).toBeTruthy();

        component.find('.ui-time-picker-label').at(0).simulate('click');

        then(() => {
            expect(component.state('open')).toBeFalsy();
            expect(component.hasClass('state-focus')).toBeFalsy();
            expect(focusSpy).not.toHaveBeenCalled();
        }).then(done);
    });

    it('change mode', done => {

        component.find('.ui-time-picker-label').at(0).simulate('click');

        then(() => {
            expect(component.state('open')).toBeTruthy();
            document.querySelector('.ui-time-picker-header-time-minute').click();
        }).then(() => {
            expect(document.querySelector('.ui-time-picker-header-time-minute').className).toMatch('state-selected');
            done();
        });
    });

    it('uncontrolled timepicker', done => {

        component.unmount();

        component = mount(
            <TimePicker defaultValue="11:00:00" />
        );

        expect(component.state('value')).toEqual('11:00:00');

        component.find('.ui-time-picker-label').at(0).simulate('click');
        let buttons = [];

        then(() => {
            expect(component.state('open')).toBeTruthy();
            document.querySelector('.ui-time-picker-header-apm-pm').click();
            document.querySelector('.ui-button.variant-confirm').click();
        }).then(() => {
            expect(component.state('value')).toEqual('23:00:00');
            done();
        });
    });

    it('controlled timepicker', done => {

        component.unmount();

        const changeSpy = jasmine.createSpy('change');

        component = mount(
            <TimePicker value={new Date(2017, 1, 1, 11, 0, 0)} onChange={changeSpy} />
        );

        expect(component.state('value')).toEqual('11:00:00');

        component.find('.ui-time-picker-label').at(0).simulate('click');
        let buttons = [];

        then(() => {
            expect(component.state('open')).toBeTruthy();
            document.querySelector('.ui-time-picker-header-apm-pm').click();
            document.querySelector('.ui-button.variant-confirm').click();
        }).then(() => {
            expect(changeSpy).toHaveBeenCalled();
            expect(component.state('value')).toEqual('11:00:00');
            expect(changeSpy.calls.argsFor(0)[0].value).toBe('23:00:00');
            done();
        });
    });

});
