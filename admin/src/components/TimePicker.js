import React, {createElement} from 'react';
import {Field} from 'redux-form';
import TimePicker from 'material-ui/TimePicker';

const format = date => {
    return (date.getHours() * 60) + date.getMinutes();
};

const parse = minutes => {
    const date = new Date();
    const hours = Math.floor(minutes / 60);
    date.setHours(hours);
    date.setMinutes(minutes % 60);
    return date;
};

export const TimeInput = (superProps) =>(<div>
    <Field name={superProps.source} {...superProps} component={(props) => {
        const error = props.meta && props.meta.touched && props.meta.error;
        return (
            <div>
                <TimePicker
                    hintText="5 minutes step"
                    value={parse(props.input.value)}
                    floatingLabelText={superProps.source.split('_').map(string => {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    }).join(' ') + ' *'}
                    onChange={(e, date) => props.input.onChange(format(date))}
                    minutesStep={5}
                />
                {error
                    ?<div style={{"position":"relative","bottom":"-10px","fontSize":"12px","lineHeight":"12px","color":"rgb(244, 67, 54)","transition":"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"}}>
                        {error}
                    </div> : ''}
            </div>
        )}} />
</div>);

//export const RichTextInput = ReachText;




