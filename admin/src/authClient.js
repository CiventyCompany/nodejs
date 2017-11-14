import { AUTH_LOGIN, AUTH_GET_PERMISSIONS, AUTH_LOGOUT, AUTH_CHECK } from 'admin-on-rest';
import {API_ROOT} from "./contstants";

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request(`${API_ROOT}/login`, {
            method: 'POST',
            body: JSON.stringify({ login: username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token, role }) => {
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
            });
    }

    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return Promise.resolve();
    }

    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }

    if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('role');
        return Promise.resolve(role);
    }
    return Promise.resolve();
}