const Router = require('./routes/router');

const http = require('http');
const json = require('./middlewares/json');
const methods = require('methods')
const response = require('./utils/response');
function NodeRouter() {
	const router = new Router();

	function listen(port) {
		const cb = console.log(`listening on ${port}`);
		try {

			http
			.createServer(async (req, res) => {
				await json(req, res);

				response(res);

				router.handleRequest(req, res);

				console.log('body', req.body);
			})
			.listen(port, cb);
		} catch (error) {
			console.log(error)
		}
		
	}
	function route(method, path, handler) {
		router.route(method, path, handler);
	}
  const routerFunctions = methods.reduce((obj, method) => {
    obj[method] = (path, handler) => route(method, path, handler);
    return obj;
  }, {});


	return {
		listen,
		...routerFunctions

	};
}

module.exports = NodeRouter;
