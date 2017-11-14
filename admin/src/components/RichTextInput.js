import React, {createElement} from 'react';
import {Field} from 'redux-form';
import ReachText from 'aor-rich-text-input'

export const RichTextInput = (superProps) =>(<div>
    <Field name={superProps.source} {...superProps} component={(props) => {
        const error = props.meta && props.meta.touched && props.meta.error;
        return (
            <div>
                <label style={{"position":"static","lineHeight":"26px","top":"38px","transition":"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms","zIndex":"1","transform":"scale(0.75) translate(0px, 0px)","transformOrigin":"left top 0px","pointerEvents":"none","userSelect":"none","color":"rgba(0, 0, 0, 0.298039)"}}>
                    <span>{superProps.source.split('_').map(string => {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    }).join(' ')} *</span>
                </label>
                <ReachText
                    {...(Object.assign({}, props, superProps))}
                />
                {error
                    ?<div style={{"position":"relative","bottom":"-10px","fontSize":"12px","lineHeight":"12px","color":"rgb(244, 67, 54)","transition":"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"}}>
                        {error}
                    </div> : ''}
            </div>
        )}} />
</div>);

//export const RichTextInput = ReachText;




