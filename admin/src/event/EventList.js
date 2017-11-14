import React from 'react';
import moment from 'moment';
import { List, Datagrid, DeleteButton, Edit, Create, ReferenceField, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'admin-on-rest';

export const isDateAfterToday = (value) => {
    return moment(value).isSameOrAfter(Date.now()) ? undefined : 'Select date in future'
};

export const parse = date => {
    if (date) {
        const formatted = new Date(date);
        formatted.setUTCHours(24);
        console.log(formatted);
        return formatted
    };

    return date;
};

export const format = date => {
    if (date) {
        const formatted = new Date(date);
        formatted.setUTCHours(0);
        console.log(formatted);
        return formatted
    };

    return date;
};


export const EventList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name_ru" />
            <TextField source="name_ua" />
            <DateField source="date" />
            <ReferenceField label="Calendar" source="calendar_id" reference="calendar" >
                <TextField source="name_ru" />
            </ReferenceField>
            <EditButton basePath="/event" />
            <DeleteButton />
        </Datagrid>
    </List>
);