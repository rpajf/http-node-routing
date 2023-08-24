/// <reference types="node" />
import http, { IncomingMessage } from 'http';
import { IncomingMessageWithBody } from 'src/middlewares/json.js';
export interface IEntity {
    id: string;
    [key: string]: unknown;
}
export interface ServerResponseExtended extends http.ServerResponse {
    send: (data: string | object) => http.ServerResponse | undefined;
}
export type Method = typeof methods;
export declare const methods: string[];
export interface Route {
    path: RegExp | string;
    handler: (req: IncomingMessageWithBody<IncomingMessage>, res: ServerResponseExtended) => void;
    method: string;
}
export type RouteFunction = (path: string, handler: (req: IncomingMessageWithBody<IncomingMessage>, res: ServerResponseExtended) => void) => void;
type RelationalFunction<T extends any[] = any[], R = any> = (...args: T) => Promise<R>;
export type GetAllFunction = RelationalFunction<[
    table: string
], Record<string, any>[]>;
export type InsertFunction = RelationalFunction<[
    table: string,
    columns: string[],
    values: any[],
    res: ServerResponseExtended
], void>;
export type UpdateFunction = RelationalFunction<[
    table: string,
    columns: string[],
    values: any[],
    condition: string
], void>;
export type DeleteFunction = RelationalFunction<[
    table: string,
    condition: string
], void>;
export type DbConnectionGeneric = {
    connection: string;
};
export {};
