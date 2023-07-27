import { ServerResponseExtended } from './../types';

// import { ServerResponseExtended } from '../types';
import { IncomingMessage } from 'http';
import { Route } from '../types';
import http from 'http'
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

	async handleRequest(req: IncomingMessage, res: ServerResponseExtended): Promise<Route | undefined> {
		const { method, url } = req;

		const route = this.routes.find((route) => {
			return route.method === method && route.path === url;
		});

		if (route) {
			console.log('here')
			await route.handler(req, res);
			return route;
		}
		return route;
	}
	public addRoute(route: Route) {
		this.routes.push(route);
	}

	route(
		method: string,
		path: string,
		handler: (req: IncomingMessage, res: ServerResponseExtended) => Promise<void>
	): void {
		this.addRoute({ method: method.toUpperCase(), path, handler });
	}
}
