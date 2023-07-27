import { Router } from './routes/router';
import { RouteFunction, methods } from './types';
import { buildRouteParams } from './utils/buildRouteParams';

import { ServerResponseExtended } from './types';
import http, { IncomingMessage } from 'http';
import { json } from './middlewares/json';
import { enhanceResponse } from './utils/response';

interface NodeRouter {
	listen: (port: number) => void;
	routes: Record<string, RouteFunction>;
	// Add other methods (put, delete, etc.) if needed
}

function NodeRouter() {
	const router = new Router();

	function listen(port: number) {
		try {
			http.createServer(async (req, res) => {
				await json(req, res);

				enhanceResponse(res as ServerResponseExtended);
				console.log(req);
				await router.handleRequest(req, res);
			});
		} catch (error) {
			console.log(error);
		}
	}
	function route(
		method: string,
		path: string,
		handler: (req: IncomingMessage, res: ServerResponseExtended) => void
	) {
		path = buildRouteParams(path);
		router.route(method, path, handler);
	}

	const routerFunctions = methods.reduce<Record<string, RouteFunction>>(
		(obj, method) => {
			obj[method] = (path: string, handler) => route(method, path, handler);
			// console.log('obg',obj);
			return obj;
		},
		{}
	);
	// console.log('routerfunc',routerFunctions)
	return {
		listen: (port: number) => {
			listen(port);
			console.log(`listening on ${port}`);
		},
		routes: { ...routerFunctions },
	};
}

export default NodeRouter;
