import {AllowNull, BelongsToMany, Column, ForeignKey, HasMany, Model, NotEmpty, Table} from 'sequelize-typescript';

import {CHAR} from 'sequelize';

import {CategoryModel} from './category-model';
import {EventModel} from './event-model';

import {DeviceTokenModel} from './device-token-model';
import {DeviceTokensCalendarsModel} from './device-tokens-calendars-model';
import {Calendar} from "../types";

@Table({
    tableName: 'calendars'
})
export class CalendarModel extends Model<CalendarModel> implements Calendar {
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
        type: CHAR
    })
    color: string;

    @AllowNull(false)
    @NotEmpty
    @ForeignKey(() => CategoryModel)
    @Column
    category_id: number;

    @HasMany(() => EventModel)
    events: EventModel[];

    @BelongsToMany(() => DeviceTokenModel, () => DeviceTokensCalendarsModel)
    deviceTokens: DeviceTokenModel[];
}
