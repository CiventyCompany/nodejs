import React from 'react';
import { List, Datagrid, DeleteButton, Edit, Create, ReferenceField, FunctionField, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'admin-on-rest';

export const validColor = (value) => {
    return /^#[0-9A-F]{6}$/i.test(value) ? undefined : 'Select valid color'
};

export const CalendarList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name_ru" />
            <TextField source="name_ua" />
            <FunctionField label="сolor"
                           render={record => <span style={{color: record.color}}>{
                               record.color
                           }</span>}
            />
            <ReferenceField label="Category" source="category_id" reference="category" >
                <TextField source="name_ru" />
            </ReferenceField>
            <EditButton basePath="/category" />
            <DeleteButton/>
        </Datagrid>
    </List>
);