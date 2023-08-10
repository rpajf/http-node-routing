import methodsRaw from 'methods';

import http, { IncomingMessage } from 'http';
import { IncomingMessageWithBody } from 'src/middlewares/json';

export interface IEntity {
	id: string;
	[key: string]: unknown;
}

export interface ServerResponseExtended extends http.ServerResponse {
	send: (data: string | object) => http.ServerResponse | undefined;
}
export type Method = typeof methods;
export const methods: string[] = methodsRaw as string[];

export interface Route {
	path: RegExp | string;
	handler: (
		req: IncomingMessageWithBody<IncomingMessage>,
		res: ServerResponseExtended
	) => void;
	method: string;
}
export type RouteFunction = (
	path: string,
	handler: (
		req: IncomingMessageWithBody<IncomingMessage>,
		res: ServerResponseExtended
	) => void
) => void;

type RelationalFunction<T extends any[] = any[], R = any> = (
	...args: T
) => Promise<R>;
//defining generic type parameters and a generic return

export type GetAllFunction = RelationalFunction<
	[table: string],
	Record<string, any>[]
>;

export type InsertFunction = RelationalFunction<
	[
		table: string,
		columns: string[],
		values: any[],
		res: ServerResponseExtended
	],
	void
>;

export type UpdateFunction = RelationalFunction<
	[table: string, columns: string[], values: any[], condition: string],
	void
>;

export type DeleteFunction = RelationalFunction<
	[table: string, condition: string],
	void
>;

type connectionObj = {
	user?: string;
	host?: string;
	database?: string;
	password?: string;
	port?: string;
};

export type DbConnectionGeneric = {
	connection: string;
};
type PostgresConnection = {};
