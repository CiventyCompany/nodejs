import { Response } from 'express';
import { IFindOptions } from 'sequelize-typescript';

export class HeaderCountFomatter {
    /**
     * Sets response pagination header
     * @param {string} name
     * @param {Response} response
     * @param models
     * @param {IFindOptions} options
     */
    static formatHeaderCount(
        name: string,
        response: Response,
        models: any,
        options: IFindOptions
    ): void {
        const final: number = options.offset + options.limit;
        const max: number = (final > models.count) ? models.count : final;

        const headerValue: string = `${name} ${options.offset}-${max}/${models.count}`.toString();

        response.setHeader(
            'content-range',
            headerValue,
        );
    }
}
