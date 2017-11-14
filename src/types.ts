import {Request} from "express";

export interface PublicArticle {
    id: number;
    event_id: number;
    name: string;
    description: string;
    link: string;
}

export interface PublicCalendar {
    id: number;
    category_id: number;
    name: string;
    color: string;
}

export interface PublicCategory {
    id: number;
    name: string;
    calendars?: PublicCalendar[];
}

export interface PublicEvent {
    id: number;
    calendar_id: number;
    name: string;
    description: string;
    date: Date;
    articles: PublicArticle[];
}

export interface Article {
    id?: string;
    name_ru?: string;
    name_ua?: string;
    description_ru?: string;
    description_ua?: string;
    link_ru?: string;
    link_ua?: string;
    event_id?: number;
}

export interface Calendar {
    id?: number;
    name_ru?: string;
    name_ua?: string;
    color?: string;
    category_id?: number;
}

export interface Category {
    id?: number;
    name_ru?: string;
    name_ua?: string;
    calendars: Calendar[];
}

export enum EEventNotificationInterval {
    DAYLY = 1,
    WEEKLY = 2,
    MONTHLY = 3,
    YEARLY = 4,
}

export interface CalendarEvent {
    id?: number;
    name_ua?: string;
    name_ru?: string;
    description_ru?: string;
    description_ua?: string;
    date?: string;
    time_to_notify?: string;
    notification_interval?: EEventNotificationInterval;
    next_notify?: Date;
    date_to_end_notify?: Date;
    calendar_id?: number;
}

export enum EUserRole {
    ADMIN = 1,
    MODERATOR = 2,
    ANONYMOUS = 3,
}

export interface UserServices {
    id?: number;
    login?: string;
    password?: string;
    role?: EUserRole;
}

export enum EOSType {
    IOS = 1,
    ANDROID = 2,
}

export interface DeviceToken {
    id?: number;
    token: string;
    os_type: EOSType;
}

export type LangKey = 'ru' | 'ua';

export interface Localizable extends Object {
    getLocalePropertyNames(): string[];

    getStaticPropertyNames(): string[];

    get(): object;
}

export interface IFilter {
    [property: string]: string;
}

export interface IRange {
    0: number;
    1: number;
}

export interface PublicRequestAuthorized extends Request {
    user: {
        token: string
        token_id: number;
    };
}
