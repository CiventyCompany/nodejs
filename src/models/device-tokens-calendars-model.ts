import {
    Table,
    Column,
    Model,
    ForeignKey,
} from 'sequelize-typescript';

import { CalendarModel } from './calendar-model';
import { DeviceTokenModel } from './device-token-model';

@Table({
    tableName: 'device-tokens_calendars'
})
export class DeviceTokensCalendarsModel extends Model<DeviceTokensCalendarsModel> {
    @ForeignKey(() => DeviceTokenModel)
    @Column
    device_token_id: number;

    @ForeignKey(() => CalendarModel)
    @Column
    calendar_id: number;

    /**
     * Subscribe device to calendars
     * @param {number} tokenId
     * @param {number[]} calendarIds
     * @returns {Promise<boolean>}
     */
    static async subscribeDeviceToCalendars(tokenId: number, calendarIds: number[]): Promise<boolean> {
        const extistingSubscribtions: number[] = await <PromiseLike<number[]>>DeviceTokensCalendarsModel
            .findAll({
                where: {
                    token_id: tokenId,
                    calendar_id: {
                        $in:calendarIds
                    }
                }
            }).map((model: DeviceTokensCalendarsModel) => model.getDataValue('id'));

        await DeviceTokensCalendarsModel
            .bulkCreate(calendarIds
                .filter(id => !extistingSubscribtions.includes(id))
                .map(id => ({
                    token_id: tokenId,
                    calendar_id: id,
                }))
            );
        return true;
    }

    /**
     * Unsubscribe device from calendars
     * @param {number} tokenId
     * @param {number[]} calendarIds
     * @returns {Promise<boolean>}
     */
    static async unsubscribeDeviceToCalendars(tokenId: number, calendarIds: number[]): Promise<boolean> {

        await DeviceTokensCalendarsModel.destroy({
            where: {
                token_id: tokenId,
                calendar_id: {
                    $in:calendarIds
                }
            }
        });

        return true;
    }
}
