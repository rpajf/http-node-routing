import { IncomingMessageWithBody } from "../middlewares/json";

import http from 'http';

export interface RoutesMethods {
	method: string;
	path: RegExp;
	handler: (
		req: IncomingMessageWithBody<any>,
		res: http.ServerResponse
	) => Promise<void>;
}