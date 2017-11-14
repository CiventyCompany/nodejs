import {AllowNull, Column, ForeignKey, HasMany, Model, NotEmpty, Table} from 'sequelize-typescript';

import {DATE, INTEGER, TEXT} from 'sequelize';

import {EventNotificationResolver} from './event-model/event-notification-resolver';

import {CalendarModel} from './calendar-model';
import {ArticleModel} from './article-model';
import {CalendarEvent, EEventNotificationInterval} from "../types";

@Table({
    tableName: 'events'
})
export class EventModel extends Model<EventModel> implements CalendarEvent {

    /**
     * Updates instance next notification date
     * @param {EventModel} instance
     * @returns {Promise<void>}
     */
    static scheduleNextNotificationDate(instance: EventModel) {
        instance.setDataValue('next_notify', EventNotificationResolver.getNextNotificationDate(instance));
        return Promise.resolve();
    }

    @NotEmpty
    @AllowNull(false)
    @Column
    name_ru: string;

    @NotEmpty
    @AllowNull(false)
    @Column
    name_ua: string;

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: TEXT
    })
    description_ru: string;

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: TEXT
    })
    description_ua: string;

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DATE
    })
    date: string;

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: INTEGER
    })
    time_to_notify: string;

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: INTEGER
    })
    notification_interval: EEventNotificationInterval;

    @NotEmpty
    @Column({
        type: DATE
    })
    next_notify: Date;

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: DATE
    })
    date_to_end_notify: Date;

    @NotEmpty
    @AllowNull(false)
    @ForeignKey(() => CalendarModel)
    @Column
    calendar_id: number;

    @HasMany(() => ArticleModel)
    events: ArticleModel[];
}