import React from 'react';
import {
    required, minLength, maxLength, minValue, maxValue, number, regex, email, choices,
    List, Datagrid, Edit, Create, DateInput, ReferenceInput, SelectInput, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput } from 'admin-on-rest';
import {RichTextInput} from "../components/RichTextInput";

import {TimeInput} from "../components/TimePicker";
import {isDateAfterToday, parse, format} from "./EventList";
import {EVENT_NOTIFICATIONS} from "../contstants";

export const EventCreate = (props) => (
    <Create title="Create an Event" {...props}>
        <SimpleForm>
            <ReferenceInput
                label="Calendar"
                source="calendar_id"
                reference="calendar"
                perPage={100}
                allowEmpty
                validate={[required]}
            >
                <SelectInput optionText="name_ru" />
            </ReferenceInput>
            <TextInput source="name_ru" validate={[required, minLength(3), maxLength(250)]} />
            <TextInput source="name_ua" validate={[required, minLength(3), maxLength(250)]} />
            <RichTextInput source="description_ru" validate={[required]} />
            <RichTextInput source="description_ua" validate={[required]} />
            <DateInput source="date" parse={parse} format={format} validate={[required, isDateAfterToday]} />
            <h4 style={{marginBottom: 0}}>On this date will be sended first notification</h4>
            <DateInput source="next_notify" parse={parse} format={format} validate={[required]} />

            <DateInput source="date_to_end_notify" parse={parse} format={format} validate={[required, isDateAfterToday]} />
            <TimeInput source="time_to_notify" validate={[required]} />
            <SelectInput source="notification_interval" validate={[required]} choices={[
                {id: EVENT_NOTIFICATIONS.DAYLY, name: 'DAYLY'},
                {id: EVENT_NOTIFICATIONS.WEEKLY, name: 'WEEKLY'},
                {id: EVENT_NOTIFICATIONS.MONTHLY, name: 'MONTHLY'},
                {id: EVENT_NOTIFICATIONS.YEARLY, name: 'YEARLY'},
            ]} />
        </SimpleForm>
    </Create>
);