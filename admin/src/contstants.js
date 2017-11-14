export let API_ROOT = '//localhost:3000/v1/admin';
export let UI_BASE = '';

try {
    if (process.env.NODE_ENV === 'production') {
        console.log('prod');

        UI_BASE = '/ui/admin';
		API_ROOT = `//${window.location.host}/v1/admin`;
    }
} catch (e) {

}

export const USER_ROLES = {
    ADMIN: 1,
    MODERATOR: 2
};

export const USER_ROLES_REVERSE = {
    1: 'ADMIN',
    2: 'MODERATOR'
};

export const EVENT_NOTIFICATIONS = {
    DAYLY: 1,
    WEEKLY: 2,
    MONTHLY: 3,
    YEARLY: 4,
};