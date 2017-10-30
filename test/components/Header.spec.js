/**
 * @file TimePicker Header spec
 * @author cxtom2008@gmail.com
 */

import React, {Component} from 'react';
import moment from 'moment';
import TestUtils from 'react-dom/test-utils';
import _ from 'lodash';
import {shallow} from 'enzyme';

import Header from '../../src/timepicker/Header';
import then from '../then';

class TestComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: moment(props.time || '15:02:00', 'HH:mm:ss').toDate(),
            mode: 'minute'
        };

        this.onModeChange = this.onModeChange.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);
    }

    onModeChange(e) {
        this.props.onModeChange && this.props.onModeChange(e);
        this.setState({mode: e.mode});
    }

    onTimeChange(e) {
        this.props.onTimeChange && this.props.onTimeChange(e);
        this.setState({time: e.time});
    }

    render() {

        const {time, mode} = this.state;
        return (
            <Header
                time={time}
                mode={mode}
                onModeChange={this.onModeChange}
                onChange={this.onTimeChange} />
        );
    }
}

describe('Header', () => {

    it('dom', () => {

        let wrapper = shallow(
            <Header
                time={moment('05:02:00', 'HH:mm:ss').toDate()}
                mode="hour"
                onModeChange={_.noop}
                onChange={_.noop} />
        );

        expect(wrapper.hasClass('ui-time-picker-header')).toBe(true);

        let time = wrapper.children().at(0);
        expect(time.hasClass('ui-time-picker-header-time')).toBe(true);
        let hour = time.children().at(0);
        let minute = time.children().at(2);
        expect(hour.hasClass('ui-time-picker-header-time-hour')).toBe(true);
        expect(hour.text()).toBe('05');
        expect(minute.hasClass('ui-time-picker-header-time-minute')).toBe(true);
        expect(minute.text()).toBe('02');

        let apm = wrapper.children().at(1);
        expect(apm.hasClass('ui-time-picker-header-apm')).toBe(true);
        let am = apm.children().at(0);
        let pm = apm.children().at(1);
        expect(am.hasClass('ui-time-picker-header-apm-am')).toBe(true);
        expect(am.text()).toBe('AM');
        expect(pm.hasClass('ui-time-picker-header-apm-pm')).toBe(true);
        expect(pm.text()).toBe('PM');
    });

    it('change mode', done => {

        const changeSpy = jasmine.createSpy('modeChange');

        const component = TestUtils.renderIntoDocument(
            <TestComponent onModeChange={changeSpy} />
        );

        const hour = TestUtils.findRenderedDOMComponentWithClass(
            component,
            'ui-time-picker-header-time-hour'
        );

        const minute = TestUtils.findRenderedDOMComponentWithClass(
            component,
            'ui-time-picker-header-time-minute state-selected'
        );

        expect(TestUtils.isDOMComponent(minute)).toBeTruthy();
        expect(TestUtils.isDOMComponent(hour)).toBeTruthy();

        TestUtils.Simulate.click(minute);
        then(() => {
            expect(changeSpy).not.toHaveBeenCalled();
            expect(component.state.mode).toEqual('minute');
            TestUtils.Simulate.click(hour);
        })
        .then(() => {
            expect(changeSpy).toHaveBeenCalledWith({mode: 'hour'});
            expect(component.state.mode).toEqual('hour');
            changeSpy.calls.reset();
            TestUtils.Simulate.click(minute);
        })
        .then(() => {
            expect(changeSpy).toHaveBeenCalledWith({mode: 'minute'});
            done();
        });

    });

    it('change am & pm', done => {
        const changeSpy = jasmine.createSpy('modeChange');

        const component = TestUtils.renderIntoDocument(
            <TestComponent onTimeChange={changeSpy} />
        );

        const am = TestUtils.findRenderedDOMComponentWithClass(
            component,
            'ui-time-picker-header-apm-am'
        );

        const pm = TestUtils.findRenderedDOMComponentWithClass(
            component,
            'ui-time-picker-header-apm-pm state-selected'
        );

        expect(TestUtils.isDOMComponent(am)).toBeTruthy();
        expect(TestUtils.isDOMComponent(pm)).toBeTruthy();

        TestUtils.Simulate.click(pm);
        then(() => {
            expect(changeSpy).not.toHaveBeenCalled();
            expect(moment(component.state.time).format('HH:mm:ss')).toEqual('15:02:00');
            TestUtils.Simulate.click(am);
        })
        .then(() => {
            expect(changeSpy).toHaveBeenCalled();
            expect(moment(component.state.time).format('HH:mm:ss')).toEqual('03:02:00');
            changeSpy.calls.reset();
            TestUtils.Simulate.click(pm);
        })
        .then(() => {
            expect(changeSpy).toHaveBeenCalled();
            expect(moment(component.state.time).format('HH:mm:ss')).toEqual('15:02:00');
            done();
        });
    });

    it('00:00', () => {

        const component = TestUtils.renderIntoDocument(
            <TestComponent time={moment('00:00:00', 'HH:mm:ss').toDate()} />
        );

        TestUtils.findRenderedDOMComponentWithClass(
            component,
            'ui-time-picker-header-apm-am'
        );

        TestUtils.findRenderedDOMComponentWithClass(
            component,
            'ui-time-picker-header-apm-pm state-selected'
        );

        const hour = TestUtils.findRenderedDOMComponentWithClass(
            component,
            'ui-time-picker-header-time-hour'
        );

        expect(hour.innerText).toEqual('00');

    });

});
