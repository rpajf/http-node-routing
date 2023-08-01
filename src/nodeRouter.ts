import { Router } from './routes/router';
import { RouteFunction, methods } from './types';
import { buildRouteParams } from './utils/buildRouteParams';

import { ServerResponseExtended } from './types';
import http, { IncomingMessage } from 'http';
import { IncomingMessageWithBody, json } from './middlewares/json';
import { enhanceResponse } from './utils/response';
import { ChildProcess } from 'child_process';

interface NodeRouter {
	listen: (port: number) => void;
	routes: Record<string, RouteFunction>;
	// Add other methods (put, delete, etc.) if needed
}

function NodeRouter() {
	const router = new Router();

	function listen(port: number, cb: any) {
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
		path: string,
		handler: (
			req: IncomingMessageWithBody<IncomingMessage>,
			res: ServerResponseExtended
		) => void
	) {
		console.log('path on route fn', path);
		// const routeParams = path.replace(/[^a-zA-Z0-9 ]/g, '');
		// console.log( routeParams);
		// console.log('changed path', buildRouteParams(path));
		return router.route(method, path, handler);
	}

	const routerFunctions = methods.reduce<Record<string, RouteFunction>>(
		(obj, method) => {
			obj[method] = (path: string, handler) => route(method, path, handler);
			return obj;
		},
		{}
	);

	return {
		listen,
		...routerFunctions,
	};
}

export default NodeRouter;
