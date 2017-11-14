import { IFindOptions } from 'sequelize-typescript';

import { Response, Request } from 'express';

import {
    GET,
    PUT,
    Path,
    POST,
    DELETE,
    Errors,
    ContextResponse,
    ContextRequest,
    QueryParam,
    PathParam,
} from 'typescript-rest';

import { UserServicesModel} from '../../models/user-services-model';

import { ModelListOptionsFactory } from '../../helpers/ModelListOptionsFactory';
import { HeaderCountFomatter } from '../../helpers/ModelListHeaderCountFomatter';
import {UserServices} from "../../types";

@Path('users-service')
export class UserServicesController {

    @GET
    async listUserServices(
        @ContextResponse res: Response,
        @ContextRequest req: Request,
        @QueryParam('filter') filter?: string,
        @QueryParam('sort') sort?: string,
        @QueryParam('range') range?: string,
    ): Promise<UserServices[]> {
        const options: IFindOptions = ModelListOptionsFactory.make(
            ModelListOptionsFactory.parseRawOptions(filter, sort, range)
        );

        const models = await <PromiseLike<{
            count: number,
            rows: UserServicesModel[]
        }>>UserServicesModel.findAndCountAll(options);

        HeaderCountFomatter.formatHeaderCount('articles', res, models, options);

        return <UserServices[]>models.rows;
    }

    @GET
    @Path(':id')
    async getUserService(
        @PathParam('id') id: number,
    ): Promise<UserServices> {
        const model = await <PromiseLike<UserServicesModel>>UserServicesModel.findById(id);
        if (!model) {
            throw new Errors.NotFoundError();
        }
        return model;
    }

    @POST
    async addUserService(
        @ContextRequest request: Request,
    ): Promise<UserServices> {
        try {
            const params: UserServices = request.body;
            return <PromiseLike<UserServicesModel>>UserServicesModel.create(params);
        } catch (e) {
            throw new Errors.BadRequestError(e);
        }
    }

    @PUT
    @Path(':id')
    async updateUserService(
        @PathParam('id') id: number,
        @ContextRequest request: Request,
    ): Promise<UserServices> {
        try {
            const params: UserServices = request.body;
            return <PromiseLike<UserServicesModel>>UserServicesModel
                .findById(id).then(user => user.update(params));
        } catch (e) {
            throw new Errors.BadRequestError(e);
        }
    }

    @DELETE
    @Path(':id')
    async deleteUserService(
        @PathParam('id') id: number,
    ): Promise<any> {
        try {
            await <PromiseLike<UserServicesModel>>UserServicesModel.destroy({
                where: { id }
            });
            return {
                data: 'Deleted'
            };
        } catch (e) {
            throw new Errors.BadRequestError(e);
        }
    }

}
