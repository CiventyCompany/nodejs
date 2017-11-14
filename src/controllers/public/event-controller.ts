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

import { EventModel} from '../../models/event-model';

import { ModelListOptionsFactory } from '../../helpers/ModelListOptionsFactory';
import { HeaderCountFomatter } from '../../helpers/ModelListHeaderCountFomatter';
import {CalendarEvent} from "../../types";

@Path('events')
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
}
