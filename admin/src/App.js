import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory'
import { simpleRestClient, fetchUtils, Admin, Resource, Delete } from 'admin-on-rest';
import authClient from './authClient';

import { USER_ROLES, API_ROOT, UI_BASE } from "./contstants";

import {CategoryCreate} from "./category/CategoryCreate";
import {CategoryEdit} from "./category/CategoryEdit";
import {CategoryList} from "./category/CategoryList";
import {CategoryIcon} from './category/CategoryIcon';

import {CalendarCreate} from "./calendar/CalendarCreate";
import {CalendarEdit} from "./calendar/CalendarEdit";
import {CalendarList} from "./calendar/CalendarList";
import {CalendarIcon} from "./calendar/CalendarIcon";

import {EventCreate} from "./event/EventCreate";
import {EventEdit} from "./event/EventEdit";
import {EventList} from "./event/EventList";
import {EventIcon} from "./event/EventIcon";

import {ArticleCreate} from "./article/ArticleCreate";
import {ArticleEdit} from "./article/ArticleEdit";
import {ArticleList} from "./article/ArticleList";
import {ArticleIcon} from "./article/ArticleIcon";

import {UsersServiceCreate} from "./users-service/UsersServiceCreate";
import {UsersServiceEdit} from "./users-service/UsersServiceEdit";
import {UsersServiceList} from "./users-service/UsersServiceList";
import {UsersServiceIcon} from "./users-service/UsersServiceIcon";

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');

    if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
    }

    return fetchUtils.fetchJson(url, options);
};

const history = createHistory({
    basename: UI_BASE
});

class App extends Component {
    render() {
        return (
            <Admin
                authClient={authClient}
                title="Uteka Calendar"
                history={history}
                restClient={simpleRestClient(API_ROOT, httpClient)}>
                {permissions => [
                    <Resource
                        name="category"
                        list={CategoryList}
                        edit={CategoryEdit}
                        create={CategoryCreate}
                        remove={Delete}
                        icon={CategoryIcon}
                    />,
                    <Resource
                        name="calendar"
                        list={CalendarList}
                        edit={CalendarEdit}
                        create={CalendarCreate}
                        remove={Delete}
                        icon={CalendarIcon}
                    />,
                    <Resource
                        name="event"
                        list={EventList}
                        edit={EventEdit}
                        create={EventCreate}
                        remove={Delete}
                        icon={EventIcon}
                    />,
                    <Resource
                        name="article"
                        list={ArticleList}
                        edit={ArticleEdit}
                        create={ArticleCreate}
                        remove={Delete}
                        icon={ArticleIcon}
                    />,
                    permissions === USER_ROLES.ADMIN.toString()
                        ? <Resource
                            name="users-service"
                            options={{
                                label: 'Users'
                            }}
                            list={UsersServiceList}
                            edit={UsersServiceEdit}
                            create={UsersServiceCreate}
                            remove={Delete}
                            icon={UsersServiceIcon}
                        />
                        : null
                ]}





            </Admin>
        );
  }
}

export default App;
