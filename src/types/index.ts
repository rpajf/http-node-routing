import methodsRaw from 'methods';

import http, { IncomingMessage } from 'http';
import { IncomingMessageWithBody } from 'src/middlewares/json';

// export interface RoutesMethods {
// 	method: string;
// 	path: RegExp;
// 	handler: (
// 		req: IncomingMessageWithBody<any>,
// 		res: http.ServerResponse
// 	) => Promise<void>;
// }

export interface IEntity {
	id: string;
	[key: string]: unknown;
}

export interface ServerResponseExtended extends http.ServerResponse {
	send: (data: string | object) => http.ServerResponse;
}
export type Method = typeof methods;
export const methods: string[] = methodsRaw as string[];

export interface Route {
	path: string;
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
