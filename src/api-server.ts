import * as express     from 'express';
import { Server }       from 'typescript-rest';
import * as http        from 'http';
import * as path        from 'path';
import * as cors        from 'cors';
import * as bodyParser  from 'body-parser';
import * as helmet      from 'helmet';
import { Sequelize }    from 'sequelize-typescript';
import * as config      from 'config';

import {DatabaseConnectionFactory} from './helpers/DatabaseConnectionFactory';
import {InitSuperAdmin} from './helpers/initSuperAdmin';

import {adminAuthMiddleware} from './middlewares/admin/auth';
import {adminAccessControlMiddleware, adminAccessControlMiddlewareAdapter} from './middlewares/admin/accessControl';
import {PublicAuthMiddleware} from './middlewares/public/auth';

import controllersAdmin from './controllers/admin/index';
import controllersPublic from './controllers/public/index';

export class ApiServer {
    public PORT: number = parseInt(config.get('app.port').toString(), 10);

    private app: express.Application;
    private server: http.Server = null;
    private adminRouter: express.Router = express.Router();
    private publicRouter: express.Router = express.Router();
    private adminUIRouter: express.Router = express.Router();
    private databaseConnection: Sequelize = null;

    constructor() {
        this.app = express();

        this.config();
        this.wakeupDb()
            .then(() => InitSuperAdmin.init())
            .then(() => {
            Server.buildServices(this.adminRouter, ...controllersAdmin);
            this.app.use('/v1/admin', this.adminRouter);

            Server.buildServices(this.publicRouter, ...controllersPublic);
            this.app.use('/v1/api', this.publicRouter);

            this.app.use('/ui/admin', this.adminUIRouter);
            this.config();

            Server.swagger(this.app, './swagger/swagger.json', '/api-docs', `localhost:${this.PORT}`, ['http']);
        });
    }

    /**
     * Configure the express app.
     */
    private config(): void {
        // Native Express configuration
        // this.app.use( bodyParser.urlencoded( { extended: false } ) );

        this.app.use(bodyParser.json({ limit: '1mb' }));
        this.app.use(express.static(path.join(__dirname, '..', 'admin', 'build'), { maxAge: 31557600000 }));

        // security headers
        this.app.use(helmet({}));

        // Pagination helper
        this.app.use(cors({
            exposedHeaders: 'Content-Range',
        }));

        this.app.get('/', (req, res) => {
           res.redirect('/ui/admin');
        });

        this.adminRouter.use(adminAuthMiddleware.initialize());
        this.adminRouter.all('*', (req, res, next) => {

            // Hack for easy anon login;
            if (req.url === '/login') {
                return next();
            }

            return adminAuthMiddleware.authenticate('jwt', {
                session: false
            })(req, res, next);
        });

        this.adminRouter.use(adminAccessControlMiddlewareAdapter);
        this.adminRouter.use(adminAccessControlMiddleware.authorize);

        this.publicRouter.use(PublicAuthMiddleware.authenticate);

        this.adminUIRouter.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '..', 'admin', 'build', 'index.html'));
        });
    }

    /**
     * Syncs models with database;
     * @returns {Promise<void>}
     */
    private async wakeupDb(): Promise<void> {
        this.databaseConnection = await DatabaseConnectionFactory.make();
    }

    /**
     * Start the server
     * @returns {Promise<void>}
     */
    public start(): Promise<void> {
        return new Promise<any>((resolve, reject) => {
            this.server = this.app.listen(this.PORT, (err: any) => {
                if (err) {
                    return reject(err);
                }
                // tslint:disable-next-line:no-console
                console.log(`Listening to http://${this.server.address().address}:${this.server.address().port}`);
                return resolve();
            });
        });

    }

    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    public stop(): Promise<any> {
        return new Promise<any>((resolve) => {
            if (this.databaseConnection && this.databaseConnection.close) {
                this.databaseConnection.close();
            }

            if (this.server) {
                this.server.close(() => {
                    resolve(true);
                });
            } else {
                return resolve(true);
            }
        }).catch(e => console.log(e));
    }

}
