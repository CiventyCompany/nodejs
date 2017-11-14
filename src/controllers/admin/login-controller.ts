import { Response, Request } from 'express';

import {
    Path,
    POST,
    Errors,
    ContextResponse,
    ContextRequest,
} from 'typescript-rest';

import { UserServicesModel } from '../../models/user-services-model';

import { TokenSerializer } from '../../middlewares/admin/auth';

export interface AdminLogin {
    login: string;
    password: string;
}

export interface IAdminLoginSuccess {
    token: string;
    role: string;
}

@Path('login')
export class LoginController {

    static verifyInput(params: AdminLogin): void {
        if (!params.login) {
            throw new Errors.BadRequestError(JSON.stringify({
                login: 'Field required',
            }));
        }

        if (!params.password) {
            throw new Errors.BadRequestError(JSON.stringify({
                password: 'Field required',
            }));
        }
    }

    static getSuccessResponse(model: UserServicesModel): IAdminLoginSuccess {
        return {
            role: model.getDataValue('role'),
            token: TokenSerializer.serialize({
                id: model.getDataValue('id')
            }),
        };
    }

    @POST
    async login(
        @ContextRequest request: Request,
        @ContextResponse response: Response
    ): Promise<IAdminLoginSuccess> {
        const params: AdminLogin = request.body;

        LoginController.verifyInput(params);

        const model: UserServicesModel = await <PromiseLike<UserServicesModel>>UserServicesModel.findOne({
            where: {
                login: params.login
            }
        });

        if (model) {
            const isPasswordValid: boolean =  await model.isPasswordValid(params.password);

            if (isPasswordValid) {
                return LoginController.getSuccessResponse(model);
            }

            throw new Errors.BadRequestError(JSON.stringify({
                password: 'Field required',
            }));

        } else {

            throw new Errors.BadRequestError(JSON.stringify({
                login: 'User not exists',
            }));
        }
    }
}
