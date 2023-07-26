/**
 * Adds http verbs as methods to the instance of this library.
 *
 * @param {String} path
 * @return {Route}
 * @public
 */

class Router {
	routes = [];

	constructor() {
		this.routes = [];
	}

	handleRequest(req, res) {
		const { method, url } = req;

		const route = this.routes.find((route) => {
			return route.method === method && route.path === url;
		});

		route.handler(req, res);
		return route;
	}
	addRoute({ method, path, handler }) {

		this.routes.push({ method, path, handler });
	}

	route(method, path, handler) {
		this.addRoute({ method: method.toUpperCase(), path, handler });
	}
}

module.exports = Router;
