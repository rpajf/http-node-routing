const methods = require('methods');

const router = require('./route')
/**
 * Takes the methods verbs and adds into the instance of server.
 *
 * @param {String} path
 * @return {Route}
 * @public
 */

console.log(methods)
class Router {
	constructor(path, handler, method) {
		this.path = path;
		this.handler = handler;
	}

	
  post(req, res){
    const {method, url} = req
    this.method = 'POST'
  }
}
Router.prototype.handler = new Router().
module.exports = Router;
