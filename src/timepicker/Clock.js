/**
 * @file melon/TimePickerClock
 * @author cxtom(cxtom2008@qq.com)
 */

import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import {create} from 'melon-core/classname/cxBuilder';
import {range} from 'melon-core/util/array';
import {getPosition} from 'melon/common/util/dom';

import ClockItem from './ClockItem';
import ClockHand from './ClockHand';

const cx = create('TimePickerClock');
const {
    PI,
    atan
} = Math;

export default class TimePickerClock extends Component {

    constructor(...args) {
        super(...args);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        // 限流
        this.onMouseChange = (() => {

            let handler = this.onMouseChange;

            return e => {
                clearTimeout(this.mouseChangeTimer);
                this.mouseChangeTimer = setTimeout(handler.bind(this, e), 5);
            };

        })();
    }

    /**
     * react 组件生命周期——判断是否需要更新组件，用来做性能优化
     *
     * @public
     * @param {Object} nextProps 更新的属性
     * @return {boolean} 是否需要更新
     */
    shouldComponentUpdate(nextProps) {

        const {
            time,
            mode,
            begin,
            end
        } = this.props;

        return !moment(time).isSame(nextProps.time)
            || mode !== nextProps.mode
            || !moment(begin).isSame(nextProps.begin)
            || !moment(end).isSame(nextProps.end);
    }

    /**
     * react 组件生命周期——组件销毁前调用
     *
     * @public
     */
    componentWillUnmount() {
        clearTimeout(this.mouseChangeTimer);
        this.mouseChangeTimer = null;
    }

    onMouseDown(e) {

        if (this.props.mode === 'minute') {
            this.refs.main.addEventListener('mousemove', this.onMouseChange);
            document.addEventListener('mouseup', this.onMouseUp);
        }
        else {
            this.refs.main.addEventListener('mouseup', this.onMouseChange);
        }
    }

    onMouseUp(e) {

        if (this.props.mode === 'minute') {
            this.onMouseChange(e);
            this.refs.main.removeEventListener('mousemove', this.onMouseChange);
            document.removeEventListener('mouseup', this.onMouseUp);
        }
        else {
            this.refs.main.removeEventListener('mouseup', this.onMouseChange);
        }
    }

    onMouseChange({pageX, pageY}) {

        const mainPosition = getPosition(this.refs.main);
        const radius = mainPosition.width / 2;

        const pos = {
            x: pageX - mainPosition.left - radius,
            y: pageY - mainPosition.top - radius
        };

        let deg;

        if (pos.y === 0) {
            return;
        }

        if (pos.x >= 0 && pos.y < 0) {
            deg = -180 * atan(pos.x / pos.y) / PI;
        }
        else if (pos.x >= 0 && pos.y > 0) {
            deg = 180 - 180 * atan(pos.x / pos.y) / PI;
        }
        else if (pos.x < 0 && pos.y > 0) {
            deg = 180 - 180 * atan(pos.x / pos.y) / PI;
        }
        else if (pos.x < 0 && pos.y < 0) {
            deg = 360 - 180 * atan(pos.x / pos.y) / PI;
        }

        const {
            time,
            mode
        } = this.props;

        const single = mode === 'minute' ? 6 : 30;
        let number = Math.round(deg / single);

        if (mode === 'hour') {
            // number为0表示选择了上午12点
            number = number === 0 ? 12 : number;
            // 下午的时间加12
            number = time.getHours() > 12 ? number + 12 : number;
            // number为24时的特殊处理，日期如果不改为0，日期会加1
            number = number === 24 ? 0 : number;
        }

        const newTime = moment(time)[mode](number).toDate();

        if (moment(newTime).isSame(time)) {
            return;
        }

        this.props.onChange({
            time: newTime
        });

    }

    renderItems() {

        const {
            time,
            mode,
            begin,
            end
        } = this.props;

        const items = mode === 'hour'
            ? range(1, 13)
            : range(0, 60, 5);

        return items.map(number => {

            let timeMoment;
            let selected = false;
            if (mode === 'hour') {
                let hour = moment(time).hour();
                hour = hour === 0 ? 12 : hour;
                selected = (hour > 12 ? (hour - 12) : hour) === number;
                const itemHour = hour > 12 ? (number + 12) : number;
                timeMoment = moment(time).hour(itemHour);
            }
            else {
                selected = moment(time).minute() === number;
                timeMoment = moment(time).minute(number);
            }

            let disabled = false;
            disabled = begin ? timeMoment.isBefore(begin) : false;
            disabled = end ? timeMoment.isAfter(end) : false;

            return (
                <ClockItem
                    key={mode + number}
                    time={timeMoment.toDate()}
                    mode={mode}
                    selected={selected}
                    disabled={disabled} />
            );
        });

    }

    render() {

        const {
            time,
            mode,
            onChange
        } = this.props;

        const className = cx(this.props)
            .addVariants(mode)
            .build();

        return (
            <div className={className}>
                <div
                    className={cx.getPartClassName('main')}
                    ref="main"
                    onMouseDown={this.onMouseDown}>
                    <ClockHand
                        time={time}
                        mode={mode}
                        onChange={onChange} />
                    {this.renderItems()}
                </div>
            </div>
        );

    }

}

TimePickerClock.displayName = 'TimePickerClock';

TimePickerClock.propTypes = {
    time: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['hour', 'minute']),
    begin: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired
};
