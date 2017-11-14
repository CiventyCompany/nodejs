'use strict';
import * as cluster from 'cluster';
import { ApiServer } from './api-server';
import {Notifications} from './helpers/notifications';

// tslint:disable:no-console
export const schedule = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        console.log('schedule connecting!..');
        Notifications.run().then(resolve).catch(reject);

        process.on('SIGTERM', Notifications.stop);
        process.on('SIGINT', Notifications.stop);
    });
};

export const start = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const apiServer = new ApiServer();
        apiServer.start()
            .then(() => {
                if (cluster.isMaster) {
                    schedule();
                }
                resolve();
            })
            .catch(reject);

        const graceful = () => {
            apiServer.stop().then(() => process.exit(0));
        };

        // Stop graceful
        process.on('SIGTERM', graceful);
        process.on('SIGINT', graceful);
    });
};
