/**
 * @file melon/TimePickerHeader
 * @author cxtom(cxtom2008@qq.com)
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {create} from 'melon-core/classname/cxBuilder';

const cx = create('TimePickerHeader');

/**
 * melon/TimePickerHeader
 *
 * @extends {React.Component}
 * @class
 */
export default class TimePickerHeader extends Component {

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const props = this.props;

        const {time, mode} = props;
        const timeMoment = moment(time);

        const selected = mode === 'hour';

        let hour = moment(time).hour();
        let isAfternoon = false;

        if (hour > 12 || hour === 0) {
            isAfternoon = true;
        }

        return (
            <div className={cx(props).build()}>
                <div className={cx.getPartClassName('time')}>
                    <span
                        onClick={selected && props.onModeChange ? null : () => {
                            props.onModeChange({mode: 'hour'});
                        }}
                        className={cx().part('time-hour').addStates({selected}).build()}>
                        {timeMoment.format('HH')}
                    </span>
                    <span>:</span>
                    <span
                        onClick={!selected && props.onModeChange ? null : () => {
                            props.onModeChange({mode: 'minute'});
                        }}
                        className={cx().part('time-minute').addStates({selected: !selected}).build()}>
                        {timeMoment.format('mm')}
                    </span>
                </div>
                <div className={cx.getPartClassName('apm')}>
                    <span
                        onClick={!isAfternoon && props.onChange ? null : () => {
                            props.onChange({time: moment(time).subtract(12, 'h').toDate()});
                        }}
                        className={cx().part('apm-am').addStates({selected: !isAfternoon}).build()}>
                        AM
                    </span>
                    <span
                        onClick={isAfternoon && props.onChange ? null : () => {
                            props.onChange({time: moment(time).add(12, 'h').toDate()});
                        }}
                        className={cx().part('apm-pm').addStates({selected: isAfternoon}).build()}>
                        PM
                    </span>
                </div>
            </div>
        );

    }
}

TimePickerHeader.displayName = 'TimePickerHeader';

TimePickerHeader.defaultProps = {
    time: moment().millisecond(0).seconds(0).toDate(),
    mode: 'hour'
};

TimePickerHeader.propTypes = {
    time: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['hour', 'minute']),
    onModeChange: PropTypes.func
};
