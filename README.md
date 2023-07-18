## Steps
### 2 - Config your env variables
## Basic usage

```javascript
// import the Entity generic class and
// route helpers
const { Entity, IEntity, buildRouteParams, json } = require('crud-lib');

```
### 2 - In your server file

```javascript

const port = process.env.PORT || 3000;

const server = http.createServer(
	async (req: IncomingMessageWithBody<any>, res) => {
		await json<IEntity>(req, res);
		const { method, url } = req;

		const route = routes.find(
			(route) => route.method === method && route.path.test(url!)
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

server.listen(port, () => {
	console.log(`listen on ${port}`);
});


```
create an .env file with the `port` variable on the root of the project
### 3 - Start server
Run `yarn start:dev` to start the server
