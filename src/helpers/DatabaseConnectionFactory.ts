import { Sequelize } from 'sequelize-typescript';
import * as Bluebird    from 'bluebird';
import * as config from 'config';

import models from '../models/index';

export class DatabaseConnectionFactory {
    /**
     * Configures connection and syncs models
     * @returns {Promise<Sequelize>}
     */
    static async make(): Promise<Sequelize> {
        const sequelize: Sequelize = new Sequelize({
            dialect: 'mysql',
            name: config.get('db.name').toString(),
            username: config.get('db.username').toString(),
            password: config.get('db.password').toString(),
            host: config.get('db.host').toString(),
        });
        return sequelize.authenticate()
            .then(() => {
                sequelize.addModels(models);
                let doneSync = Bluebird.resolve();

                models.forEach(model => {
                    doneSync = doneSync.then(() => <PromiseLike<any>>model.sync());
                });

                return doneSync;
            })
            .then(() => Promise.resolve(sequelize));
    }
}