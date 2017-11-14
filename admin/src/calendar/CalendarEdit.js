import React from 'react';
import {
    required, minLength, maxLength, minValue, maxValue, number, regex, email, choices,
    List, Datagrid, Edit, Create, ReferenceInput, SelectInput, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'admin-on-rest';
import ColorInput from '../components/ColorInput';

import {validColor} from "./CalendarList";

export const CalendarEdit = (props) => (
    <Edit title="Calendar" {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name_ru" validate={[required, minLength(3), maxLength(250)]}/>
            <TextInput source="name_ua" validate={[required, minLength(3), maxLength(250)]}/>
            <ReferenceInput
                label="Category"
                source="category_id"
                reference="category"
                perPage={100}
                validate={[required]}
                allowEmpty
            >
                <SelectInput optionText="name_ru" />
            </ReferenceInput>
            <ColorInput source="color" validate={[required, validColor]} />
        </SimpleForm>
    </Edit>
);