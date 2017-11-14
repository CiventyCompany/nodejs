import React from 'react';
import { List, Datagrid, Edit, DeleteButton, FunctionField, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'admin-on-rest';

import {USER_ROLES_REVERSE} from "../contstants";

export const UsersServiceList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="login" />
            <FunctionField label="role"
                           render={record => USER_ROLES_REVERSE[record.role]}
            />
            <EditButton basePath="/users-service" />
            <DeleteButton/>
        </Datagrid>
    </List>
);