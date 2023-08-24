import { Router } from './routes/router';
import { RouteFunction, methods } from './types';
import { buildRouteParams } from './utils/buildRouteParams';

import { ServerResponseExtended } from './types';
import http, { IncomingMessage } from 'http';
import { IncomingMessageWithBody, json } from './middlewares/json';
import { enhanceResponse } from './utils/response';


export function createNodeRouter() {
	const router = new Router();

	function listen(port: number | string, cb?: any) {
		try {
			http
				.createServer(async (req, res) => {
					await json(req, res);

					enhanceResponse(res as unknown as ServerResponseExtended);
					router.handleRequest(
						req as IncomingMessageWithBody<IncomingMessage>,
						res as unknown as ServerResponseExtended
					);
				})
				.listen({ port }, () => {
					if (cb) {
						if (typeof cb === 'function') {
							return cb();
						}
						throw new Error('Listen callback needs to be a function');
					}
				});
		} catch (error) {
			console.log(error);
		}
	}
	function route(
		method: string,
		path: RegExp | string,
		handler: (
			req: IncomingMessageWithBody<IncomingMessage>,
			res: ServerResponseExtended
		) => void
	) {
		path = buildRouteParams(path as string);

		return router.route(method, path, handler);
	}

	const routerFunctions = methods.reduce<Record<string, RouteFunction>>(
		(obj, method) => {
			obj[method] = (path: string, handler) => route(method, path, handler);
			return obj;
		},
		{}
	);
	const { get, post, delete: del, put, patch } = routerFunctions;

	return {
		listen,
		post,
		get,
		delete: del,
		put,
		patch,
	};
}
