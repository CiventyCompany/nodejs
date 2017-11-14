import {Response} from 'express';

import {DeviceTokenModel} from '../../models/device-token-model';
import {PublicRequestAuthorized} from "../../types";

export class PublicAuthMiddleware {
    /**
     * Adds user data to request, saves device token in db
     * @param {PublicRequestAuthorized} request
     * @param {e.Response} response
     * @param next
     * @returns {Promise<void>}
     */
    static async authenticate(request: PublicRequestAuthorized, response: Response, next) {
        const deviceToken: string = request.get('X-DEVICE-TOKEN');
        const osType: number = parseInt(request.get('X-OS-TYPE'), 10);

        if (!deviceToken || !osType) {
            response.sendStatus(400);
            response.send("Missing X-DEVICE-TOKEN and X-OS-TYPE");
            next();
        }

        try {
            const model = await DeviceTokenModel.findOrCreate({
                where: {
                    token: deviceToken,
                },
                defaults:{
                    token: deviceToken,
                    os_type: osType,
                }});

            request.user = {
                token: deviceToken,
                token_id: model[0].getDataValue('id')
            };
            console.log("_________________________");

            next();
        } catch (e) {
            next(e);
        }
    }
}
