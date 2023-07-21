const methods = require('methods');
const buildRouteParams = require('../utils/buildRouteParams')

class Route {
  constructor({method, path, handler}) {
    route = {method, path, handler}
		// this.path = path;
    // this.method= method
    // this.handler = handler
    this.route = route
	}
  requestHandler(method) {
		console.log('method', method)
		const name = method.toLowerCase();
		return Boolean(this.methods[name]);
	}


  
	match() {
    const req = this.req
    const path = buildRouteParams(this.path)
    const routeParams =  req.url.match(path);
    console.log('req parms', req.params)
		if (routeParams !== null) {
			const { groups } = routeParams;
			req.params = groups;
		}
    console.log('routeParams',routeParams)
	}
}

module.exports = Route;
