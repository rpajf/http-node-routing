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
		// const lowerCaseMethod = method.toLowerCase();
		this.routes.push({ method, path, handler });
	}
	// post(path, handler) {
	// 	this.addRoute({ method: 'POST', path, handler });
	// }
	// get(path, handler) {
	// 	this.addRoute({ method: 'GET', path, handler });
	// }
	// put(path, handler) {
	// 	this.addRoute({ method: 'PUT', path, handler });
	// }
	// delete(path, handler) {
	// 	this.addRoute({ method: 'DELETE', path, handler });
	// }
	route(method,path, handler){
		this.addRoute({ method: method.toUpperCase(), path, handler });
	}
}

module.exports = Router;
