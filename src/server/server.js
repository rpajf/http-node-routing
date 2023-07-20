const http = require('http')
const json = require('../middlewares/json')
const Router = require('../routes/router')
const port = process.env.PORT || 3000;



function injectAttrsReq(method){

}
// injetar um metodo com cada verbo
// - get post put 
const router = new Router()
const server = http.createServer(
	async (req, res) => {
		await json(req, res);
		console.log('req',req,res)

		router.handle(req, res)
		// example on the usage of the http server
	
		const route = routes.find(
			(route) => route.method === method && route.path.test(url)
		);
		if (route && req.url) {
			const routeParams = req.url.match(route.path);
			if (routeParams !== null) {
				const { groups } = routeParams;
				req.params = groups;
		}
			try {
				route.handler(req, res);
			} catch (error) {
				console.log('error', error);
			}
		}
	}
);



server.listen(3000, () => {
	console.log('listening on 3000')
})
// module.exports = server