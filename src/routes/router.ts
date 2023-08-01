import { IncomingMessageWithBody } from './../middlewares/json';
import { ServerResponseExtended } from './../types';

import { IncomingMessage } from 'http';
import { Route } from '../types';
import http from 'http';
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
		console.log('method on handle request', method, url);

		const route = this.routes.find((route) => {
			console.log('route method', route.method, 'route path', route.path);
			const condition = route.method === method && route.path === url
			console.log('method from req', method, 'url', url);
			return route.method === method && route.path === url;
		});
		console.log('route', route);
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
	// get(path: any, handler: any) {
	// 	// const { method } = req;
	// 	this.addRoute({ method: 'GET', path, handler });
	// }
	// route(
	// 	method: any,
	// 	path: string,
	// 	handler: (
	// 		req: IncomingMessage,
	// 		res: ServerResponseExtended
	// 	) => Promise<void>
	// ): void {
	// 	// console.log()
	// 	console.log('on route method', method, { handler }, path);
	// 	this.addRoute({ method: method.toUpperCase(), path, handler });
	// }
	
	route(
		method: any,
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
