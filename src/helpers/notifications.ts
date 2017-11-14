import {Sequelize} from 'sequelize';

import {DatabaseConnectionFactory} from './DatabaseConnectionFactory';
import {EventNotificationExecutor} from '../models/event-model/event-notification-executor';

const NOTIFICATION_SEND_INTERVAL = 5 * 60 * 1000;

export class Notifications {
    static interval = null;
    static connection: Sequelize = null;

    /**
     * Initialise send notification job
     * @returns {Promise<void>}
     */
    static async run(): Promise<void> {
        this.connection = await DatabaseConnectionFactory.make();
        const executor = new EventNotificationExecutor();
        await executor.execute();
        this.interval = setInterval(() => {
            executor.execute();
        }, NOTIFICATION_SEND_INTERVAL);
    }

    /**
     * Cancel send notification job
     * @returns {Promise<void>}
     */
    static async stop(): Promise<void> {
        clearInterval(this.interval);
        if (this.connection && this.connection.close) {
            await this.connection.close();
        }
    }
}
