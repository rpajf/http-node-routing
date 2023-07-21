const Router = require('./routes/router');

const http = require('http');
const json = require('./middlewares/json');
const Layer = require('./routes/layer')
const Route = require('./routes/route');
const response = require('./utils/response')
function NodeRouter() {
  const router = new Router();
  function mapHandler(req, res){

  }

	function listen(port) {
		const cb = console.log(`listening on ${port}`);
		http
			.createServer(async (req, res) => {
				await json(req, res);
				// console.log('req',req,res)
        
				const { method, url } = req;
        response(res)

        router.handleRequest(req, res)
		
				console.log('body', req.body);
			})
			.listen(port, cb);
	}
	function handle() {}
	function put() {}
	function get(path, handle) {

    router.get(path, handle)
  }
  function get2(req, handle) {
    const { method, url } = req;

    router.get(url, handle)
  }
	function post(path, handle) {
    router.post(path, handle)
	}
  return {
    listen,
    handle,
    get,
    post,
    put
  }
}

// class NodeRouter {
// 	listen(port) {
// 		const cb = console.log(`listening on ${port}`);
// 		http
// 			.createServer(async (req, res) => {
// 				await json(req, res);
// 				// console.log('req',req,res)
// 				const { method, url } = req;
//         // if(method==='GET'){
//         //   console.log('here get')
//         //   this.get(req,res)
//         // }
//         // if(method==='POST'){
//         //   console.log('here POST')
//         //   this.post(req,res)
//         // }
// 				const router = new Router(method, url);
// 				const route = new Route(url, req, method);
//         route.requestHandler(method)
//         // route.handle()
//         // route.match()
// 				// console.log(router.info());
// 				// console.log(route.match());
// 				console.log('body', req.body);

// 			})
// 			.listen(port, cb);
// 	}
//   handle(){

//   }
// 	put() {}
// 	get(req,res) {

//   }
// 	post(req,res) {
//     console.log('res', res)

//   }
// }
module.exports = NodeRouter;
