import { IncomingMessageWithBody } from './../middlewares/json.js';
import { ServerResponseExtended } from './../types/index.js';
import { IncomingMessage } from 'http';
import { Route } from '../types/index.js';

export class Router {
	private routes: Route[];

	constructor() {
		this.routes = [];
	}

	handleRequest(
		req: IncomingMessageWithBody<IncomingMessage>,
		res: ServerResponseExtended
	): void {
		const { method, url } = req;

		const matchedRoute = this.routes.map((route) => {
				if (route.method === method && route.path instanceof RegExp && url) {
					const match = route.path.exec(url);
					if (match) {
						return {
							route: route,
							params: match.groups,
						};
					}
				} else if (
					route.method === method &&
					typeof route.path === 'string' &&
					route.path === url
				) {
					return {
						route: route,
						params: {},
					};
				}
			})
			.find((matched) => matched !== undefined);

		try {
			if (matchedRoute) {
				req.params = matchedRoute.params;
				Promise.resolve(matchedRoute.route.handler(req, res)).catch((error) => {
					this.handleError(error, res);
				});
				
			} else {
				res.statusCode = 404;
				res.send({ error: 'Route not found' });
			}
		} catch (error) {
			this.handleError(error, res)
			console.log(`Error during request, ${error}`);
			res.statusCode = 500;
			res.send({ error: 'Error during request' });
		}
	}
	public addRoute(route: Route) {
		this.routes.push(route);
	}
	handleError(error: string | unknown, res: ServerResponseExtended) {
		console.log(`Error during request, ${error}`);
		res.statusCode = 500;
		res.send({ error: 'Error during request' });
	}

	route(
		method: string,
		path: RegExp,
		handler: (req: IncomingMessage, res: ServerResponseExtended) => void
	): void {
		this.addRoute({ method: method.toUpperCase(), path, handler });
	}
}
