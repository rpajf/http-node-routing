import { IncomingMessageWithBody } from './../middlewares/json';
import { ServerResponseExtended } from './../types';
import { buildRouteParams } from 'src/utils/buildRouteParams';
import { IncomingMessage } from 'http';
import { Route } from '../types';

/**
 * Adds http verbs as methods to the instance of this library.
 *
 * @param {String} path
 * @return {Route}
 * @public
 */

export class Router {
	private routes: Route[];

	constructor() {
		this.routes = [];
	}

	handleRequest(
		req: IncomingMessageWithBody<IncomingMessage>,
		res: ServerResponseExtended
	): Route | undefined {
		const { method, url } = req;
		const route = this.routes.find((route) => {
			console.log('route path', route?.path, { url });
			// console.log();
			return route.method === method && route.path === url;
		});
		// console.log('route', route);
		try {
			if (route) {
				console.log('here');
				route.handler(req, res);
				return route;
			}
			return route;
		} catch (error) {
			console.log(`Error during request, ${error}`);
			res.statusCode = 500;
			res.send({ error: 'Error during request' });
		}
	}
	public addRoute(route: Route) {
		this.routes.push(route);
	}

	route(
		method: string,
		path: string,
		handler: (
			req: IncomingMessage,
			res: ServerResponseExtended
		) => Promise<void>
	): void {
		// console.log()
		console.log('on route method', method, { handler }, path);
		this.addRoute({ method: method.toUpperCase(), path, handler });
	}
}
