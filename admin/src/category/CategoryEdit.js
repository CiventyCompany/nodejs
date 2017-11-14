import React from 'react';
import {
    required, minLength, maxLength, minValue, maxValue, number, regex, email, choices,
    List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'admin-on-rest';

export const CategoryEdit = (props) => (
    <Edit title="Category" {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name_ru" validate={[required, minLength(3), maxLength(250)]}/>
            <TextInput source="name_ua" validate={[required, minLength(3), maxLength(250)]} />
        </SimpleForm>
    </Edit>
);