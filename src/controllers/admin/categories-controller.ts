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

import { CategoryModel} from '../../models/category-model';

import { ModelListOptionsFactory } from '../../helpers/ModelListOptionsFactory';
import { HeaderCountFomatter } from '../../helpers/ModelListHeaderCountFomatter';
import {Category} from "../../types";

@Path('category')
export class CategoriesController {

    @GET
    async listCategories(
        @ContextResponse res: Response,
        @QueryParam('filter') filter?: string,
        @QueryParam('sort') sort?: string,
        @QueryParam('range') range?: string,
    ): Promise<Category[]> {
        const options: IFindOptions = ModelListOptionsFactory.make(
            ModelListOptionsFactory.parseRawOptions(filter, sort, range)
        );

        const models = await <PromiseLike<{
            count: number,
            rows: Category[]
        }>>CategoryModel.findAndCountAll(options);

        HeaderCountFomatter.formatHeaderCount('category', res, models, options);

        return <Category[]>models.rows;
    }

    @GET
    @Path(':id')
    async getCategory(
        @PathParam('id') id: number,
    ): Promise<Category> {
        const model = await <PromiseLike<CategoryModel>>CategoryModel.findById(id);
        if (!model) {
            throw new Errors.NotFoundError();
        }
        return model;
    }

    @POST
    async addCategory(
        @ContextRequest request: Request,
    ): Promise<Category> {
        try {
            const params: Category = request.body;
            return <PromiseLike<CategoryModel>>CategoryModel.create(params);
        } catch (e) {
            throw new Errors.BadRequestError(e);
        }
    }

    @PUT
    @Path(':id')
    async updateCategory(
        @PathParam('id') id: number,
        @ContextRequest request: Request,
    ): Promise<Category> {
        try {
            const params: Category = request.body;
            return <PromiseLike<CategoryModel>>CategoryModel.update(params, {
                where: {
                    id
                }
            });
        } catch (e) {
            throw new Errors.BadRequestError(e);
        }
    }

    @DELETE
    @Path(':id')
    async deleteCategory(
        @PathParam('id') id: number,
    ): Promise<any> {
        try {
            await <PromiseLike<CategoryModel>>CategoryModel.destroy({
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
