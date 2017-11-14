import * as config from 'config';
import * as Bluebird from 'bluebird';
import * as FirebaseCloudMessaging from 'fcm-node';

import {EventModel} from '../event-model';

const FCM: any = new FirebaseCloudMessaging(config.get('firebase'));

export class EventNotifier {
    /**
     * Formats topic for clients subscription (/topics/calendar21${lang})
     * @param {EventModel} model
     * @returns {string}
     */
    static formatTopic(model: EventModel): string {
        return `/topics/calendar${model.getDataValue('calendar_id')}`.toString();
    }

    /**
     * Wraps FCM.send to promise
     * @param message
     * @returns {Promise<any>}
     */
    static async sendAsync(message: any): Promise<any> {
     return new Bluebird((fulfill, reject) => FCM.send(message, (err, done) => {
         if (err) {
             console.warn(err);
             reject(err);
         } else {
             fulfill(done);
         }
     }));
    }

    /**
     * Sends push notification to Firebase Cloud Messaging
     * @param {EventModel} event
     * @returns {Promise<any>}
     */
    static async notify(event: EventModel): Promise<any> {
      const messageRu = {
          to: this.formatTopic(event) + 'ru',
          notification: {
              title: `Календарь Uteka`,
              body: `Напоминание о событии ${event.getDataValue('name_ru')}`
          },
          data: {
              id: event.getDataValue('id').toString(),
          },
      };

      const messageUa = {
            to: this.formatTopic(event) + 'ua',
            notification: {
                title: event.getDataValue('name_ua'),
                body: `Наближається подія ${event.getDataValue('name_ua')}`
            },
            data: {
                id: event.getDataValue('id').toString(),
            },
      };

      return Bluebird.all([
          this.sendAsync(messageRu),
          this.sendAsync(messageUa),
      ]);
    }
}
