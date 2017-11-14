import React from 'react';
import {
    required, minLength, maxLength, minValue, maxValue, number, regex, email, choices,
    List, Datagrid, Edit, SelectInput, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'admin-on-rest';
import {USER_ROLES} from "../contstants";

export const UsersServiceCreate = (props) => (
    <Create title="Create a Category" {...props}>
        <SimpleForm>
            <TextInput source="login" validate={[required, minLength(4)]}/>
            <TextInput source="password" type="password" validate={[required, minLength(6)]}/>
            <SelectInput source="role" validate={[required]} choices={[
                {id: USER_ROLES.ADMIN, name: 'Admin'},
                {id: USER_ROLES.MODERATOR, name: 'Moderator'},
            ]} />
        </SimpleForm>
    </Create>
);