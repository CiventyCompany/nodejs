import {AllowNull, Column, HasMany, Model, NotEmpty, Table,} from 'sequelize-typescript';

import {CalendarModel} from './calendar-model';
import {Category} from "../types";

@Table({
    tableName: 'categories'
})
export class CategoryModel extends Model<CategoryModel> implements Category {
    @NotEmpty
    @AllowNull(false)
    @Column
    name_ru: string;

    @NotEmpty
    @AllowNull(false)
    @Column
    name_ua: string;

    @HasMany(() => CalendarModel)
    calendars: CalendarModel[];
}
