/**
 * @file melon/TimePicker
 * @author cxtom <cxtom2008@gmail.com>
 */

import React, {PropTypes} from 'react';
import moment from 'moment';

import InputComponent from 'melon-core/InputComponent';
import {create} from 'melon-core/classname/cxBuilder';

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

        const value = this.state.value;

        this.onLabelClick = this.onLabelClick.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);

        this.state = {

            ...this.state,

            // 缓存用户在 confirm 前的选中值
            time: value ? this.parseValue(value) : void 0,

            // 是否打开选择窗
            open: false
        };

    }

    /**
     * 格式化日期
     *
     * @param {Date} time 源日期对象
     * @param {string=} format 日期格式，默认为当前实例的timeFormat
     * @return {string} 格式化后的日期字符串
     * @private
     */
    stringifyValue(time) {

        if (typeof time === 'string') {
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
     * @private
     */
    parseValue(date) {

        if (typeof date !== 'string') {
            return date;
        }

        return moment(date, this.props.timeFormat).toDate();
    }


    onLabelClick(e) {

        const {disabled, readOnly} = this.props;

        if (disabled || readOnly) {
            return;
        }

        this.setState({open: true});

    }

    /**
     * rawValue 在 TimePicker Dialog上点击确定或取消按钮触发
     *
     * @private
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

        });

    }

    onCancel() {
        this.setState({open: false});
    }

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
                    open={this.state.open}
                    variants={['timepicker']}
                    onConfirm={this.onConfirm}
                    onCancel={this.onCancel}
                    onShow={this.props.onFocus}
                    onHide={this.props.onBlur}
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
