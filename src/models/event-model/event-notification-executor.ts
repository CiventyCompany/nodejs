import * as Bluebird from 'bluebird';
import * as moment from 'moment';
import { IFindOptions } from 'sequelize-typescript';

import {EventModel} from '../event-model';
import {EventNotifier} from './event-notifier';

/**
* Little hack for timezones
*/
const offset: number = (new Date()).getTimezoneOffset() * -1;

export class EventNotificationExecutor {
    /**
     * Returns specification for unsended events find options
     * @returns {IFindOptions}
     */
    private getFindOptions(): IFindOptions {
        return {
            where: {
                next_notify: {
                    $lte: moment().utcOffset(offset).toDate()
                },
            }
        };
    }

    /**
     * Returns specification for unsended options
     * @param {EventModel} event
     * @returns {Promise<void>}
     */
    private async performNotification(event: EventModel): Promise<void> {
        await EventNotifier.notify(event);
        await EventModel.scheduleNextNotificationDate(event);
        await event.save();
    }

    /**
     * Returns events what not already sended
     * @returns {Promise<EventModel[]>}
     */
    private async getUnnotifiedEvents(): Promise<EventModel[]> {
        return <PromiseLike<EventModel[]>>EventModel.findAll(this.getFindOptions());
    }

    public async execute(): Promise<any> {
        const events = await this.getUnnotifiedEvents();
        return Bluebird.all(events.map(this.performNotification));
    }
}
