import {AllowNull, BelongsToMany, Column, Model, NotEmpty, Table,} from 'sequelize-typescript';

import {INTEGER} from 'sequelize';

import {CalendarModel} from './calendar-model';
import {DeviceTokensCalendarsModel} from './device-tokens-calendars-model';
import {DeviceToken, EOSType} from "../types";

@Table({
    tableName: 'device_tokens'
})
export class DeviceTokenModel extends Model<DeviceTokenModel> implements DeviceToken {
    @NotEmpty
    @AllowNull(false)
    @Column
    token: string;

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: INTEGER,
    })
    os_type: EOSType;

    @BelongsToMany(() => CalendarModel, () => DeviceTokensCalendarsModel)
    calendars: CalendarModel[];
}
