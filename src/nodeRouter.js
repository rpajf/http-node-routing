const Router = require('./routes/router');

const http = require('http');
const json = require('./middlewares/json');

const response = require('./utils/response');
function NodeRouter() {
	const router = new Router();

	function listen(port) {
		const cb = console.log(`listening on ${port}`);
		http
			.createServer(async (req, res) => {
				await json(req, res);

				response(res);

				router.handleRequest(req, res);

				console.log('body', req.body);
			})
			.listen(port, cb);
	}

	function put(path, handle) {
		router.put(path, handle);
	}
	function get(path, handle) {
		router.get(path, handle);
	}

	function post(path, handle) {
		router.post(path, handle);
	}
	return {
		listen,
		handle,
		get,
		post,
		put,
	};
}

module.exports = NodeRouter;
