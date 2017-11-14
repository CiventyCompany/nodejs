import * as moment from 'moment';

import {EventModel} from '../event-model';
import {EEventNotificationInterval} from "../../types";

/**
* Little hack for timezones
*/
const offset: number = (new Date()).getTimezoneOffset() * -1;

export class EventNotificationResolver {
    /**
     * Each method returns nearest date in future
     * satisfied by interval rule
     * @type {{}}
     */
    static INTERVAL_DATE_RESOLVERS: {
        [interval: string]: () => Date;
    } = {
        [EEventNotificationInterval.DAYLY.toString()]()  {
           return moment().utcOffset(offset).add(1, 'd').toDate();
        },
        [EEventNotificationInterval.WEEKLY.toString()]()  {
            return moment().utcOffset(offset).add(1, 'w').toDate();
        },
        [EEventNotificationInterval.MONTHLY.toString()]()  {
            return moment().utcOffset(offset).add(1, 'M').toDate();
        },
        [EEventNotificationInterval.YEARLY.toString()]()  {
            return moment().utcOffset(offset).add(1, 'y').toDate();
        }
    };

    /**
     * User for next_notify field in model
     * @param {EventModel} event
     * @returns {Date}
     */
    static getNextNotificationDate(event: EventModel): Date {
        const notificationEnd: Date = event.getDataValue('date_to_end_notify');

        const notificationDate: Date = this.INTERVAL_DATE_RESOLVERS[event.getDataValue('notification_interval')]();

        /**
         * Handle if last notification was alredy sended
         */
        if (notificationEnd < notificationDate) {
            return null;
        }

        const notificationMinutesFromZero: number = event.getDataValue('time_to_notify');

        notificationDate.setHours(Math.floor(notificationMinutesFromZero / 60));
        notificationDate.setMinutes(notificationMinutesFromZero % 60);

        return notificationDate;
    }
}
