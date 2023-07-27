

import methodsRaw from 'methods'

import http from 'http';

// export interface RoutesMethods {
// 	method: string;
// 	path: RegExp;
// 	handler: (
// 		req: IncomingMessageWithBody<any>,
// 		res: http.ServerResponse
// 	) => Promise<void>;
// }
export interface ServerResponseExtended extends http.ServerResponse {
  send: (data: string | object) => http.ServerResponse;
}
export type Method = typeof methods
export const methods: string[] = methodsRaw as string[];

export interface Route {
	path: string
	handler: (req:http.IncomingMessage, res:ServerResponseExtended) => void
	method: string

}
export type RouteFunction = (
  path: string,
  handler: (req: http.IncomingMessage, res: ServerResponseExtended) => void
) => void;
