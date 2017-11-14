import React from 'react';
import {
    required, minLength, maxLength, minValue, maxValue, number, regex, email, choices,
    List, Datagrid, Edit, Create, DateInput, ReferenceInput, SelectInput, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput } from 'admin-on-rest';
import {RichTextInput} from "../components/RichTextInput";
import {isDateAfterToday, parse, format} from "./EventList";
import { TimeInput } from "../components/TimePicker";

export const EventEdit = (props) => (
    <Edit title="Event" {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
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
            <TextInput source="name_ru" validate={[required, minLength(3), maxLength(250)]}/>
            <TextInput source="name_ua" validate={[required, minLength(3), maxLength(250)]}/>
            <RichTextInput source="description_ru" validate={[required]}/>
            <RichTextInput source="description_ua" validate={[required]}/>
            <DisabledInput source="date" parse={parse} format={format} validate={[required, isDateAfterToday]} />
            <h4 style={{marginBottom: 0}}>On this date will be sended next notification</h4>
            <DisabledInput source="next_notify" parse={parse} format={format} validate={[required]} />
            <DisabledInput source="date_to_end_notify" parse={parse} format={format} validate={[required, isDateAfterToday]}/>
            <DisabledInput source="time_to_notify" validate={[required]} />
            <DisabledInput source="notification_interval" validate={[required]} />
        </SimpleForm>
    </Edit>
);