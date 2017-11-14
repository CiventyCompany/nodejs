import {UserServicesModel} from '../models/user-services-model';
import {EUserRole} from "../types";

export class InitSuperAdmin {
    /**
     * Inits first super-admin user if not exists
     * @returns {PromiseLike<any>}
     */
    static init(): PromiseLike<any> {
        return UserServicesModel
            .findOrCreate({
                where: {login: 'admin'},
                defaults: {role: EUserRole.ADMIN, password: '123'}
            });
    }
}
