/**
 * @file melon/TimePickerPanel
 * @author cxtom(cxtom2008@qq.com)
 */

import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import {create} from 'melon-core/classname/cxBuilder';

import Header from './Header';
import Clock from './Clock';

const cx = create('TimePickerPanel');

/**
 * melon/TimePickerPanel
 *
 * @extends {React.Component}
 * @class
 */
export default class TimePickerPanel extends Component {

    /**
     * 构造函数
     *
     * @constructor
     * @public
     * @param  {*} props 组件属性
     */
    constructor(props) {

        super(props);

        this.onModeChange = this.onModeChange.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);

        /**
         * 初始状态
         *
         * @private
         * @type {Object}
         */
        this.state = {
            time: props.time,
            mode: props.mode
        };
    }

    /**
     * react 组件生命周期——属性更新
     *
     * @public
     * @override
     * @param {Object} nextProps 更新的属性
     */
    componentWillReceiveProps(nextProps) {

        const time = nextProps.time;

        if (!moment(time).isSame(this.props.time)) {
            this.setState({time});
        }
    }

    /**
     * react 组件生命周期——判断是否需要更新组件，用来做性能优化
     *
     * @public
     * @override
     * @param {Object} nextProps 更新的属性
     * @param {Object} nextState 更新的状态
     * @return {boolean} 是否需要更新
     */
    shouldComponentUpdate(nextProps, nextState) {
        return !moment(nextState.time).isSame(this.state.time)
            || nextState.mode !== this.state.mode;
    }

    /**
     * 编辑模式改变时触发
     *
     * @protected
     * @param  {Object} param 事件对象
     * @param  {string} param.mode 改变的模式
     */
    onModeChange({mode}) {
        this.setState({mode});
    }

    /**
     * 时间改变时触发
     *
     * @protected
     * @param  {Object} param 事件对象
     * @param  {Date} param.time 改变的时间
     * @param  {boolean} param.isModeChange 选择模式是否有改变
     */
    onTimeChange({time, isModeChange = false}) {

        let nextState = {time};

        if (this.props.mode === 'hour' && isModeChange) {
            nextState.mode = 'minute';
        }

        this.setState(nextState, () => {
            this.props.onChange({time});
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
            mode
        } = this.state;

        const {
            begin,
            end
        } = this.props;

        return (
            <div className={cx(this.props).build()}>
                <Header
                    time={time}
                    mode={mode}
                    onModeChange={this.onModeChange}
                    onChange={this.onTimeChange} />
                <Clock
                    time={time}
                    mode={mode}
                    begin={begin}
                    end={end}
                    onChange={this.onTimeChange} />
            </div>
        );

    }

}

TimePickerPanel.displayName = 'TimePickerPanel';

TimePickerPanel.defaultProps = {
    time: moment().millisecond(0).seconds(0).toDate(),
    mode: 'hour'
};

TimePickerPanel.propTypes = {
    time: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['hour', 'minute']),
    begin: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired
};
