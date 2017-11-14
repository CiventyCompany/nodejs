import React from 'react';
import {
    required, minLength, maxLength, minValue, maxValue, number, regex, email, choices,
    List,  Datagrid, Edit,SelectInput, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'admin-on-rest';
import {USER_ROLES} from "../contstants";

export const UsersServiceEdit = (props) => (
    <Edit title="Category" {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DisabledInput source="login" validate={[required]} />
            <TextInput source="password" type="password" validate={[required, minLength(6)]}/>
            <SelectInput source="role" choices={[
                {id: USER_ROLES.ADMIN, name: 'Admin'},
                {id: USER_ROLES.MODERATOR, name: 'Moderator'},
            ]} />
        </SimpleForm>
    </Edit>
);