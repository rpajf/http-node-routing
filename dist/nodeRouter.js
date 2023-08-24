import { Router } from './routes/router';
import { methods } from './types';
import { buildRouteParams } from './utils/buildRouteParams';
import http from 'http';
import { json } from './middlewares/json';
import { enhanceResponse } from './utils/response';
export function createNodeRouter() {
    const router = new Router();
    function listen(port, cb) {
        try {
            http
                .createServer(async (req, res) => {
                await json(req, res);
                enhanceResponse(res);
                router.handleRequest(req, res);
            })
                .listen({ port }, () => {
                if (cb) {
                    if (typeof cb === 'function') {
                        return cb();
                    }
                    throw new Error('Listen callback needs to be a function');
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    function route(method, path, handler) {
        path = buildRouteParams(path);
        return router.route(method, path, handler);
    }
    const routerFunctions = methods.reduce((obj, method) => {
        obj[method] = (path, handler) => route(method, path, handler);
        return obj;
    }, {});
    const { get, post, delete: del, put, patch } = routerFunctions;
    return {
        listen,
        post,
        get,
        delete: del,
        put,
        patch,
    };
}
//# sourceMappingURL=nodeRouter.js.map