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

/**
 * melon/TimePickerClock
 *
 * @extends {React.Component}
 * @class
 */
export default class TimePickerClock extends Component {


    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param  {*} props 组件属性
     */
    constructor(props) {
        super(props);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseChange = this.onMouseChange.bind(this);
    }

    /**
     * react 组件生命周期——判断是否需要更新组件，用来做性能优化
     *
     * @public
     * @override
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
     * @override
     */
    componentWillUnmount() {
        clearTimeout(this.mouseChangeTimer);
        this.mouseChangeTimer = null;
    }

    /**
     * 鼠标按下事件处理
     *
     * @protected
     * @param  {MouseEvent} e 事件对象
     */
    onMouseDown(e) {

        if (this.props.mode === 'minute') {
            this.refs.main.addEventListener('mousemove', this.onMouseChange);
            document.addEventListener('mouseup', this.onMouseUp);
        }
        else {
            this.refs.main.addEventListener('mouseup', this.onMouseChange);
        }
    }

    /**
     * 鼠标松开事件处理
     *
     * @protected
     * @param  {MouseEvent} e 事件对象
     */
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


    /**
     * 鼠标操作处理
     *
     * @protected
     * @param  {MouseEvent} param 鼠标事件对象
     * @param  {number} param.pageX x 坐标
     * @param  {number} param.pageY y 坐标
     */
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
            mode,
            begin,
            end
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
        else if (mode === 'minute') {
            number = number === 60 ? 0 : number;
        }

        const newTime = moment(time)[mode](number).toDate();

        if (moment(newTime).isSame(time)
            || (begin && moment(newTime).isBefore(begin))
            || (end && moment(newTime).isAfter(end))
        ) {
            return;
        }

        this.props.onChange({
            time: newTime
        });

    }

    /**
     * 渲染数字
     *
     * @public
     * @return {ReactElement}
     */
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

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
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
