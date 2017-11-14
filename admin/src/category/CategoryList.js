import React from 'react';
import { DeleteButton, List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'admin-on-rest';

export const CategoryList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name_ru" />
            <TextField source="name_ua" />
            <EditButton basePath="/category" />
            <DeleteButton/>
        </Datagrid>
    </List>
);