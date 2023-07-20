const methods = require('methods');


export class Route {
  constructor(path, handler, method) {
		this.path = path;
		this.handler = handler;
		this.method = {};
	}

  handle(req, res) {
    const {method, url} = req
		// const method = req.method;
    const name = method.toLowerCase();
		console.log(methods[method]);
		return methods[name];
	}
}

