import { Errors } from 'typescript-rest';
import { IFindOptions } from 'sequelize-typescript';

import { IRange } from '../types';
import {IFilter} from "../types";

export interface RawOptionsConfig {
    filter?: IFilter;
    sort?: string[];
    range?: IRange;
}

export class ModelListOptionsFactory {
    /**
     * Adapts admin-on-rest simpleRestClient params to sequilize options
     * @param {RawOptionsConfig} rawOptions
     * @returns {IFindOptions}
     */
    static make(rawOptions: RawOptionsConfig): IFindOptions {
        const options: IFindOptions = {};

        if (rawOptions.filter) {
            options.where = rawOptions.filter;
        }

        if (rawOptions.sort) {
            options.order = [rawOptions.sort];
        }

        if (rawOptions.range) {
            options.offset = rawOptions.range[0];
            options.limit = rawOptions.range[1] + 1 - rawOptions.range[0];
        } else {
            options.offset = 0;
            options.limit = 10;
        }

        return options;
    }

    /**
     * Parses raw admin-on-rest simpleRestClient params
     * @param {string} filter
     * @param {string} sort
     * @param {string} range
     * @returns {RawOptionsConfig}
     */
    static parseRawOptions(filter?: string, sort?: string, range?: string): RawOptionsConfig {
        const result: RawOptionsConfig = {};
        try {
            if (filter) {
                result.filter = JSON.parse(filter.replace(/'/g, '"'));
            }

            if (range) {
                result.range = JSON.parse(range.replace(/'/g, '"'));
            }

            if (sort) {
                result.sort = JSON.parse(sort.replace(/'/g, '"'));
            }

        } catch (e) {
            throw new Errors.BadRequestError(e);
        }

        return result;
    }
}