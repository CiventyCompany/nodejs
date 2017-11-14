import { IFindOptions } from 'sequelize-typescript';

import { Response } from 'express';

import {
    GET,
    Path,
    Errors,
    ContextResponse,
    QueryParam,
    PathParam,
} from 'typescript-rest';

import { CategoryModel} from '../../models/category-model';
import { CalendarModel } from '../../models/calendar-model';

import { ModelListOptionsFactory } from '../../helpers/ModelListOptionsFactory';
import { HeaderCountFomatter } from '../../helpers/ModelListHeaderCountFomatter';
import {Category} from "../../types";

@Path('categories')
export class PublicCategoriesController {

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
        }>>CategoryModel.findAndCountAll({
            ...options,
            include: [CalendarModel]
        });

        HeaderCountFomatter.formatHeaderCount('categories', res, models, options);

        return <Category[]>models.rows;
    }

    @GET
    @Path(':id')
    async getCategory(
        @PathParam('id') id: number,
    ): Promise<Category> {
        const model = await <PromiseLike<CategoryModel>>CategoryModel.findById(id, {
            include: [CalendarModel]
        });
        if (!model) {
            throw new Errors.NotFoundError();
        }
        return model;
    }
}
