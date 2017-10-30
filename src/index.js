/**
 * @file melon/TimePicker
 * @author cxtom <cxtom2008@gmail.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import InputComponent from 'melon-core/InputComponent';
import {create} from 'melon-core/classname/cxBuilder';
import * as Util from './util';

import Icon  from 'melon/Icon';
import Confirm from 'melon/Confirm';
import Panel from './timepicker/Panel';

import omit from 'lodash/omit';

const cx = create('TimePicker');

/**
 * melon/TimePicker
 *
 * @extends {React.Component}
 * @class
 */
export default class TimePicker extends InputComponent {

    /**
     * 构造函数
     *
     * @public
     * @constructor
     * @param {*} props 属性
     * @param {*} context 上下文
     */
    constructor(props, context) {

        super(props, context);

        const {defaultValue, value, begin, end} = props;

        this.onLabelClick = this.onLabelClick.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);

        const time = value === void 0 ? defaultValue : value;

        const tiemObj = time && this.parseValue(time);
        const beginObj = begin && this.parseValue(begin);
        const endObj = end && this.parseValue(end);

        /**
         * 初始状态
         *
         * @private
         * @type {Object}
         */
        this.state = {

            ...this.state,

            value: this.stringifyValue(time && Util.closest(tiemObj, beginObj, endObj)),

            // 缓存用户在 confirm 前的选中值
            time: time ? this.parseValue(Util.closest(tiemObj, beginObj, endObj)) : void 0,

            // 是否打开选择窗
            open: false
        };

    }

    /**
     * react生命周期，组件将更新时触发，用于value和date的同步
     *
     * @param {Object} _ 属性
     * @param {Object} nextState 状态
     */
    componentWillUpdate(_, nextState) {
        const time = this.parseValue(nextState.value);
        if (this.state.value !== nextState.value && (
            time === void 0 || nextState.time === void 0
            || !moment(time).isSame(nextState.time, 'minute')
            || !moment(time).isSame(nextState.time, 'hour')
        )) {
            this.setState({
                time: this.parseValue(nextState.value)
            });
        }
    }

    /**
     * 格式化日期
     *
     * @param {Date} time 源日期对象
     * @return {string} 格式化后的日期字符串
     * @public
     */
    stringifyValue(time) {

        if (typeof time === 'string' || time == null) {
            return time;
        }

        const timeFormat = this.props.timeFormat;

        return moment(time).format(timeFormat);
    }

    /**
     * 格式化日期对象
     *
     * @param  {string} date 日期字符串
     * @return {Date}        转化后的日期对象
     * @public
     */
    parseValue(date) {

        if (typeof date !== 'string') {
            return date;
        }

        return moment(date, this.props.timeFormat).toDate();
    }


    /**
     * 点击 label
     *
     * @protected
     */
    onLabelClick() {

        this.setState({open: true});

        const onFocus = this.props.onFocus;

        if (onFocus)  {
            onFocus({
                type: 'focus',
                target: this
            });
        }
    }

    /**
     * 失去焦点时处理
     *
     * @protected
     */
    onBlur() {

        const onBlur = this.props.onBlur;

        if (onBlur)  {
            onBlur({
                type: 'blur',
                target: this
            });
        }

    }

    /**
     * TimePicker Dialog上点击确定按钮触发
     *
     * @protected
     */
    onConfirm() {

        let {value, time} = this.state;

        value = this.parseValue(value);

        const valueMoment = moment(value, this.timeFormat);
        const timeMoment = moment(time);

        if (value !== '' && valueMoment.get('hour') === timeMoment.get('hour')
            && valueMoment.get('minute') === timeMoment.get('minute')) {
            this.setState({open: false});
        }

        this.setState({open: false}, () => {

            super.onChange({
                type: 'change',
                target: this,
                value: this.stringifyValue(time)
            });

            this.onBlur();

        });

    }

    /**
     * TimePicker Dialog上点击取消按钮触发
     *
     * @protected
     */
    onCancel() {
        this.setState({open: false}, () => {
            this.onBlur();
        });
    }


    /**
     * onTimeChange - description
     *
     * @param  {Object} param 事件对象
     * @param  {Date} param.time 改变的时间
     */
    onTimeChange({time}) {
        this.setState({time});
    }

    /**
     * 渲染input
     *
     * @protected
     * @return {ReactElement}
     */
    renderHiddenInput() {

        const {name, value} = this.props;

        return name
            ? (
                <input
                    name={name}
                    type="hidden"
                    value={value} />
            )
            : null;

    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        const {
            state,
            props
        } = this;

        const {
            disabled,
            readOnly,
            placeholder,
            timeFormat,
            labelFormat,
            ...others
        } = props;

        let {begin, end} = props;

        begin = begin ? this.parseValue(begin) : null;
        end = end ? this.parseValue(end) : null;

        const {value, open} = state;

        const className = cx(props)
            .addStates({focus: open})
            .addStates(this.getStyleStates())
            .build();

        return (
            <div {...omit(others, ['name'])} className={className}>
                {this.renderHiddenInput()}
                <label
                    onClick={(disabled || readOnly) ? null : this.onLabelClick}
                    className={cx.getPartClassName('label')}>
                    {value ? moment(value, timeFormat).format(labelFormat) : (
                        <span className={cx.getPartClassName('label-placeholder')}>
                            {placeholder}
                        </span>
                    )}
                    <Icon icon='expand-more' />
                </label>
                <Confirm
                    open={open}
                    variants={['timepicker']}
                    onConfirm={this.onConfirm}
                    onCancel={this.onCancel}
                    width="adaptive"
                    buttonVariants={['secondery', 'timepicker']} >
                    <Panel
                        time={this.state.time}
                        begin={begin}
                        end={end}
                        format={timeFormat}
                        onChange={this.onTimeChange} />
                </Confirm>
            </div>
        );

    }
}

TimePicker.displayName = 'TimePicker';

TimePicker.defaultProps = {
    ...InputComponent.defaultProps,
    timeFormat: 'HH:mm:ss',
    labelFormat: 'HH:mm',
    placeholder: '请选择'
};

TimePicker.propTypes = {
    ...InputComponent.propTypes,
    placeholder: PropTypes.string,
    timeFormat: PropTypes.string,
    labalFormat: PropTypes.string,
    end: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    begin: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ])
};

TimePicker.childContextTypes = InputComponent.childContextTypes;
TimePicker.contextTypes = InputComponent.contextTypes;
