import * as acl from 'express-acl';

import { EUserRole } from '../../types';

const decodedRoleHolder = 'decodedRoleHolder';

acl.config({
    baseUrl: 'v1/admin/',
    decodedObjectName: decodedRoleHolder,
    rules:[{
        group: EUserRole.ADMIN.toString(),
        permissions: [{
            resource: '*',
            methods: '*',
            action: 'allow',
        }],
    }, {
        group: EUserRole.MODERATOR.toString(),
        permissions: [{
            resource: 'category',
            methods: '*',
            action: 'allow'
        },{
            resource: 'calendar',
            methods: '*',
            action: 'allow'
        },{
            resource: 'event',
            methods: '*',
            action: 'allow'
        },{
            resource: 'article',
            methods: '*',
            action: 'allow'
        },{
            resource: 'users-service',
            methods: '*',
            action: 'deny'
        }],

    }, {
        group: EUserRole.ANONYMOUS.toString(),
        permissions: [{
            resource: 'login',
            methods: [
                'POST'
            ],
            action: 'allow'
        }],
    }]
});

/**
 * Decodes user role to express-acl recognizable format
 * @param req
 * @param res
 * @param next
 */
export const adminAccessControlMiddlewareAdapter = (req, res, next) => {
    req[decodedRoleHolder] = {
        role: req.user && req.user.role.toString() || EUserRole.ANONYMOUS.toString(),
    };
    next();
};

export const adminAccessControlMiddleware = acl;
