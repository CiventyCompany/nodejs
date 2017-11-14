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

import { CalendarModel} from '../../models/calendar-model';

import { ModelListOptionsFactory } from '../../helpers/ModelListOptionsFactory';
import { HeaderCountFomatter } from '../../helpers/ModelListHeaderCountFomatter';
import {Calendar} from "../../types";

@Path('calendar')
export class CalendarsController {

    @GET
    async listCalendars(
        @ContextResponse res: Response,
        @QueryParam('filter') filter?: string,
        @QueryParam('sort') sort?: string,
        @QueryParam('range') range?: string,
    ): Promise<Calendar[]> {
        const options: IFindOptions = ModelListOptionsFactory.make(
            ModelListOptionsFactory.parseRawOptions(filter, sort, range)
        );

        const models = await <PromiseLike<{
            count: number,
            rows: CalendarModel[]
        }>>CalendarModel.findAndCountAll(options);

        HeaderCountFomatter.formatHeaderCount('calendars', res, models, options);

        return <Calendar[]>models.rows;
    }

    @GET
    @Path(':id')
    async getCalendar(
        @PathParam('id') id: number,
    ): Promise<Calendar> {
        const model = await <PromiseLike<CalendarModel>>CalendarModel.findById(id);
        if (!model) {
            throw new Errors.NotFoundError();
        }
        return model;
    }

    @POST
    async addCalendar(
        @ContextRequest request: Request,
    ): Promise<Calendar> {
        try {
            const params: Calendar = request.body;
            return <PromiseLike<CalendarModel>>CalendarModel.create(params);
        } catch (e) {
            throw new Errors.BadRequestError(e);
        }
    }

    @PUT
    @Path(':id')
    async updateCalendar(
        @PathParam('id') id: number,
        @ContextRequest request: Request,
    ): Promise<Calendar> {
        try {
            const params: Calendar = request.body;
            return <PromiseLike<CalendarModel>>CalendarModel.update(params, {
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
    async deleteCalendar(
        @PathParam('id') id: number,
    ): Promise<any> {
        try {
            await <PromiseLike<CalendarModel>>CalendarModel.destroy({
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
