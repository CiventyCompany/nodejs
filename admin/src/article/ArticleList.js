import React from 'react';
import { List, Datagrid, DeleteButton, Edit, Create, ReferenceField, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'admin-on-rest';

export const ArticleList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name_ru" />
            <TextField source="name_ua" />
            <ReferenceField label="Event" source="event_id" reference="event" >
                <TextField source="name_ru" />
            </ReferenceField>
            <EditButton basePath="/event" />
            <DeleteButton />
        </Datagrid>
    </List>
);