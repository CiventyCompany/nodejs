import React from 'react';
import {
    required, minLength, maxLength, minValue, maxValue, number, regex, email, choices,
    List, Datagrid, Edit, Create, DateInput, ReferenceInput, SelectInput, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput } from 'admin-on-rest';
import {RichTextInput} from "../components/RichTextInput";

export const ArticleEdit = (props) => (
    <Edit title="Event" {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <ReferenceInput
                label="Event"
                source="event_id"
                reference="event"
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
            <TextInput source="link_ru" validate={[required, minLength(3), maxLength(250)]}/>
            <TextInput source="link_ua" validate={[required, minLength(3), maxLength(250)]}/>
        </SimpleForm>
    </Edit>
);