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

import { ArticleModel} from '../../models/article-model';

import { ModelListOptionsFactory } from '../../helpers/ModelListOptionsFactory';
import { HeaderCountFomatter } from '../../helpers/ModelListHeaderCountFomatter';
import {Article} from "../../types";

@Path('article')
export class ArticlesController {

    @GET
    async listArticles(
        @ContextResponse res: Response,
        @QueryParam('filter') filter?: string,
        @QueryParam('sort') sort?: string,
        @QueryParam('range') range?: string,
    ): Promise<Article[]> {
        const options: IFindOptions = ModelListOptionsFactory.make(
            ModelListOptionsFactory.parseRawOptions(filter, sort, range)
        );
        const models = await <PromiseLike<{
            count: number,
            rows: ArticleModel[]
        }>>ArticleModel.findAndCountAll(options);

        HeaderCountFomatter.formatHeaderCount('articles', res, models, options);

        return <Article[]>models.rows;
    }

    @GET
    @Path(':id')
    async getArticle(
        @PathParam('id') id: number,
    ): Promise<Article> {
        const model = await <PromiseLike<ArticleModel>>ArticleModel.findById(id);
        if (!model) {
            throw new Errors.NotFoundError();
        }
        return model;
    }

    @POST
    async addArticle(
        @ContextRequest request: Request,
    ): Promise<Article> {
        try {
            const params: Article = request.body;
            return <PromiseLike<ArticleModel>>ArticleModel.create(params);
        } catch (e) {
            throw new Errors.BadRequestError(e);
        }
    }

    @PUT
    @Path(':id')
    async updateArticle(
        @PathParam('id') id: number,
        @ContextRequest request: Request,
    ): Promise<Article> {
        try {
            const params: Article = request.body;

            return <PromiseLike<ArticleModel>>ArticleModel.update(params, {
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
    async deleteArticle(
        @PathParam('id') id: number,
    ): Promise<any> {
        try {
            await <PromiseLike<ArticleModel>>ArticleModel.destroy({
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
