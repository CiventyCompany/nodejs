import {AllowNull, Column, ForeignKey, Model, NotEmpty, Table,} from 'sequelize-typescript';

import {TEXT} from 'sequelize';

import {EventModel} from './event-model';
import {Localizable} from "../types";
import {Article} from "../types";

@Table({
    tableName: 'articles'
})
export class ArticleModel extends Model<ArticleModel> implements Article, Localizable {
    getLocalePropertyNames() {
        return ['description', 'name', 'link'];
    }
    getStaticPropertyNames() {
        return ['id', 'event_id'];
    }

    @AllowNull(false)
    @Column
    name_ru: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    name_ua: string;

    @AllowNull(false)
    @NotEmpty
    @Column({
        type: TEXT
    })
    description_ru: string;

    @NotEmpty
    @Column({
        type: TEXT
    })
    description_ua: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    link_ua: string;

    @NotEmpty
    @Column
    link_ru: string;

    @AllowNull(false)
    @NotEmpty
    @ForeignKey(() => EventModel)
    @Column
    event_id: number;
}
