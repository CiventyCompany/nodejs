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

import { EventModel} from '../../models/event-model';

import { ModelListOptionsFactory } from '../../helpers/ModelListOptionsFactory';
import { HeaderCountFomatter } from '../../helpers/ModelListHeaderCountFomatter';
import {CalendarEvent} from "../../types";

@Path('event')
export class EventsController {

    @GET
    async listEvents(
        @ContextResponse res: Response,
        @QueryParam('filter') filter?: string,
        @QueryParam('sort') sort?: string,
        @QueryParam('range') range?: string,
    ): Promise<CalendarEvent[]> {
        const options: IFindOptions = ModelListOptionsFactory.make(
            ModelListOptionsFactory.parseRawOptions(filter, sort, range)
        );

        const models = await <PromiseLike<{
            count: number,
            rows: EventModel[]
        }>>EventModel.findAndCountAll(options);

        HeaderCountFomatter.formatHeaderCount('events', res, models, options);

        return <CalendarEvent[]>models.rows;
    }

    @GET
    @Path(':id')
    async getEvent(
        @PathParam('id') id: number,
    ): Promise<CalendarEvent> {
        const model = await <PromiseLike<EventModel>>EventModel.findById(id);
        if (!model) {
            throw new Errors.NotFoundError();
        }
        return model;
    }

    @POST
    async addEvent(
        @ContextRequest request: Request,
    ): Promise<CalendarEvent> {
        try {
            const params: CalendarEvent = request.body;
            return <PromiseLike<EventModel>>EventModel.create(params);
        } catch (e) {
            throw new Errors.BadRequestError(e);
        }
    }

    @PUT
    @Path(':id')
    async updateEvent(
        @PathParam('id') id: number,
        @ContextRequest request: Request,
    ): Promise<CalendarEvent> {
        try {
            const params: CalendarEvent = request.body;
            return <PromiseLike<CalendarEvent>>EventModel.update(params, {
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
    async deleteEvent(
        @PathParam('id') id: number,
    ): Promise<any> {
        try {
            await <PromiseLike<EventModel>>EventModel.destroy({
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
