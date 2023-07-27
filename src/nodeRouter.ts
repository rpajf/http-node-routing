import { Router } from './routes/router';
import { RouteFunction, methods } from './types';
import { buildRouteParams } from './utils/buildRouteParams';

import { ServerResponseExtended } from './types';
import http, { IncomingMessage } from 'http';
import { json } from './middlewares/json';
import { enhanceResponse } from './utils/response';
function NodeRouter() {
	const router = new Router();

	function listen(port: number) {
		// const cb = console.log(`listening on ${port}`);
		try {
			http
				.createServer(async (req, res) => {
					await json(req, res);

					enhanceResponse(res as ServerResponseExtended);

					router.handleRequest(req, res);
				})
				.listen(port);
		} catch (error) {
			console.log(error);
		}
		console.log(`listening on ${port}`);
	}
	function route(
		method: string,
		path: string,
		handler: (req: IncomingMessage, res: ServerResponseExtended) => Promise<void>
	) {
		path = buildRouteParams(path);
		router.route(method, path, handler);
	}

	const routerFunctions = methods.reduce<Record<string, RouteFunction>>((obj, method) => {
		obj[method] = (path: string, handler) => route(method, path, handler);

		return obj;
	}, {});
	console.log('routerfunc',routerFunctions)
	return {
		listen,
		...routerFunctions,
	};
}

export default NodeRouter
