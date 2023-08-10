export class Router {
    constructor() {
        this.routes = [];
    }
    handleRequest(req, res) {
        const { method, url } = req;
        const matchedRoute = this.routes.map((route) => {
            if (route.method === method && route.path instanceof RegExp && url) {
                const match = route.path.exec(url);
                if (match) {
                    return {
                        route: route,
                        params: match.groups,
                    };
                }
            }
            else if (route.method === method &&
                typeof route.path === 'string' &&
                route.path === url) {
                return {
                    route: route,
                    params: {},
                };
            }
        })
            .find((matched) => matched !== undefined);
        // try {
        if (matchedRoute) {
            req.params = matchedRoute.params;
            Promise.resolve(matchedRoute.route.handler(req, res)).catch((error) => {
                this.handleError(error, res);
            });
        }
        else {
            res.statusCode = 404;
            res.send({ error: 'Route not found' });
        }
        // } catch (error) {
        // this.handleError(error, res)
        // console.log(`Error during request, ${error}`);
        // res.statusCode = 500;
        // res.send({ error: 'Error during request' });
        // }
    }
    addRoute(route) {
        this.routes.push(route);
    }
    handleError(error, res) {
        console.log(`Error during request, ${error}`);
        res.statusCode = 500;
        res.send({ error: 'Error during request' });
    }
    route(method, path, handler) {
        this.addRoute({ method: method.toUpperCase(), path, handler });
    }
}
//# sourceMappingURL=router.js.map