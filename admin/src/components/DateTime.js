import React, { PureComponent} from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';

import {Field} from 'redux-form';

import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';

import { TextField, IconButton } from 'material-ui';
import ClearIcon from 'material-ui/svg-icons/content/clear';


class ComponentInner extends PureComponent {
    static propTypes = {
        // IMPORTANT
        DatePicker: PropTypes.func.isRequired,
        TimePicker: PropTypes.func.isRequired,

        format: PropTypes.string,
        timePickerDelay: PropTypes.number,
        okLabel: PropTypes.string,
        defaultTime: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        showCurrentDateByDefault: PropTypes.bool,
        returnMomentDate: PropTypes.bool,
        clearIcon: PropTypes.node,
        textFieldClassName: PropTypes.string,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        disabled: PropTypes.bool,

        // styles
        className: PropTypes.string,
        clearIconStyle: PropTypes.object,
        textFieldStyle: PropTypes.object,
        style: PropTypes.object,

        // DatePicker
        autoOkDatePicker: PropTypes.bool,
        onDateSelected: PropTypes.func,
        onDatePickerShow: PropTypes.func,
        shouldDisableDate: PropTypes.func,
        openToYearSelection: PropTypes.bool,
        datePickerMode: PropTypes.oneOf(['portrait', 'landscape']),
        disableYearSelection: PropTypes.bool,
        hideCalendarDate: PropTypes.bool,
        firstDayOfWeek: PropTypes.number,
        onDatePickerDismiss: PropTypes.func,
        maxDate: PropTypes.oneOf([PropTypes.object, PropTypes.string, PropTypes.number]),
        minDate: PropTypes.oneOf([PropTypes.object, PropTypes.string, PropTypes.number]),

        // TimePicker
        onTimeSelected: PropTypes.func,
        onTimePickerShow: PropTypes.func,
        timePickerBodyStyle: PropTypes.shape({}),
        timeFormat: PropTypes.oneOf(['ampm', '24hr']),
        autoOkTimePicker: PropTypes.bool,
        timePickerDialogStyle: PropTypes.shape({}),
        minutesStep: PropTypes.number,
    };

    static defaultProps = {
        DatePicker: DatePickerDialog,
        TimePicker: TimePickerDialog,
        okLabel: 'OK',
        minDate: undefined,
        maxDate: undefined,
        name: 'datepicker',
        format: 'MMM DD, YYYY hh:mm A',
        timePickerDelay: 150,
        className: 'datetime-container',
        textFieldClassName: 'datetime-input',
        defaultTime: null,
        autoOkDatePicker: true,
        datePickerMode: 'portrait',
        openToYearSelection: false,
        disableYearSelection: false,
        hideCalendarDate: false,
        firstDayOfWeek: 1,
        disabled: false,

        timeFormat: 'ampm',
        autoOkTimePicker: false,
        timePickerDialogStyle: {},
        minutesStep: 1,
        showCurrentDateByDefault: false,
        returnMomentDate: false,
        clearIcon: <ClearIcon />,

        // styles
        clearIconStyle: { },
        textFieldStyle: { },
        style: { },
        timePickerBodyStyle: { },

        // functions
        onChange: () => { },
        onFocus: () => { },
        onTimePickerShow: () => { },
        onDatePickerShow: () => { },
        onDateSelected: () => { },
        onTimeSelected: () => { },
        shouldDisableDate: () => { },
        onDatePickerDismiss: () => { },
    }

    constructor(props) {
        super(props);

        this.state = {
            dateTime: props.defaultTime ? moment(this.props.defaultTime) : null,
        };
    }


    /*
      * Get current selected date by user
      @returns { Object } moment or vanilla date object
    */
    getDate = () => {
        if (!this.state.dateTime) {
            return null;
        }

        return this.props.returnMomentDate
            ? this.state.dateTime
            : this.state.dateTime.toDate();
    }

    getDateOrCurrentTime = () => (this.state.dateTime
        ? this.state.dateTime.toDate()
        : new Date())

    getDateOrNull = time => (time
        ? moment(time).toDate()
        : null)

    getDisplayTime = () => {
        const { dateTime } = this.state;
        const defaultTime = this.props.showCurrentDateByDefault
            ? moment().format(this.props.format)
            : '';

        return dateTime
            ? dateTime.format(this.props.format)
            : defaultTime;
    }

    openDatePicker = (e) => {
        e.preventDefault();
        this.datePicker.show();
    }

    selectDate = (date) => {
        const currentDateTime = moment(this.getDateOrCurrentTime());
        const dateTime = moment(date)
            .set('hours', currentDateTime.hours()) // fill time unites
            .set('minutes', currentDateTime.minutes());

        this.setState({ dateTime });

        this.props.onDateSelected(this.getDate());
        // show timepicker
        setTimeout(() => this.timePicker.show(), this.props.timePickerDelay);
    }

    selectTime = (date) => {
        const { dateTime } = this.state;

        dateTime.hours(date.getHours());
        dateTime.minutes(date.getMinutes());

        this.setState({ dateTime }, () => {
            this.props.onTimeSelected(this.getDate());
            this.props.onChange(this.getDate());
        });
    }

    handleFocus = (event) => {
        event.target.blur();
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    clearState = () => {
        this.setState({ dateTime: null });
        this.props.onChange(null);
    }

    render() {
        const {
            clearIcon, maxDate, minDate, timeFormat,
            firstDayOfWeek, textFieldClassName, autoOkDatePicker,
            datePickerMode, disableYearSelection, shouldDisableDate,
            hideCalendarDate, openToYearSelection, timePickerBodyStyle,
            okLabel, autoOkTimePicker, timePickerDialogStyle, clearIconStyle, style, textFieldStyle,
            minutesStep, timePickerDelay, defaultTime,
            showCurrentDateByDefault, returnMomentDate,
            DatePicker, TimePicker,
            onChange, onFocus,
            onTimePickerShow,
            onDatePickerShow,
            onDatePickerDismiss,
            onDateSelected,
            onTimeSelected,
            disabled,
            ...other
        } = this.props;

        return (
            <div
                //style={{ ...styles.container, style }}
                 className={this.props.className}>
                <TextField
                    onFocus={this.handleFocus}
                    className={textFieldClassName}
                    onClick={this.openDatePicker}
                    value={this.getDisplayTime()}
                    // style={{ ...styles.textField, ...textFieldStyle }}
                    disabled={disabled}
                    {...other}
                />

                <IconButton
                    onClick={this.clearState}
                    //style={{ ...styles.clearIcon, ...clearIconStyle }}
                    disabled={disabled}
                >
                    { clearIcon }
                </IconButton>

                <DatePicker
                    ref={(node) => { this.datePicker = node; }}
                    initialDate={this.getDateOrCurrentTime()}
                    maxDate={this.getDateOrNull(maxDate)}
                    minDate={this.getDateOrNull(minDate)}
                    okLabel={okLabel}
                    autoOk={autoOkDatePicker}
                    firstDayOfWeek={firstDayOfWeek}
                    onAccept={this.selectDate}
                    mode={datePickerMode}
                    disableYearSelection={disableYearSelection}
                    onShow={onDatePickerShow}
                    onDismiss={onDatePickerDismiss}
                    shouldDisableDate={shouldDisableDate}
                    hideCalendarDate={hideCalendarDate}
                    openToYearSelection={openToYearSelection}
                />

                <TimePicker
                    ref={(node) => { this.timePicker = node; }}
                    initialTime={this.getDateOrCurrentTime()}
                    onAccept={this.selectTime}
                    bodyStyle={timePickerBodyStyle}
                    onShow={onTimePickerShow}
                    format={timeFormat}
                    okLabel={okLabel}
                    autoOk={autoOkTimePicker}
                    style={timePickerDialogStyle}
                    minutesStep={minutesStep}
                />
            </div>
        );
    }
}

export const DateTime = ({
    label,
    source,
}) => (<div>
        <Field name={source} component={({input, touched, meta}) => (
            <ComponentInner
                defaultTime={input && input.value}
                floatingLabelText={source}
                onChange={input && input.onChange}
                errorText={touched && meta.error}
            />
        )} />
    </div>
);