import {PublicRequestAuthorized} from '../../types';

import {
    POST,
    Path,
    ContextRequest,
} from 'typescript-rest';

import { DeviceTokensCalendarsModel } from '../../models/device-tokens-calendars-model';


export interface SubscriptionOptions {
    calendars: number[];
}

@Path('subscription')
export class SubscriptionController {
    @POST
    @Path('subscribe')
    async subscribe(@ContextRequest request: PublicRequestAuthorized): Promise<boolean> {
        const body: SubscriptionOptions = request.body;

        return await DeviceTokensCalendarsModel.subscribeDeviceToCalendars(request.user.token_id, body.calendars);
    }

    @POST
    @Path('unsubscribe')
    async unsubscribe(@ContextRequest request: PublicRequestAuthorized) {
        const body: SubscriptionOptions = request.body;

        return await DeviceTokensCalendarsModel.unsubscribeDeviceToCalendars(request.user.token_id, body.calendars);
    }
}
