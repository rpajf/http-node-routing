"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./routes/router");
const types_1 = require("./types");
const buildRouteParams_1 = require("./utils/buildRouteParams");
const http_1 = __importDefault(require("http"));
const json_1 = require("./middlewares/json");
const response_1 = require("./utils/response");
function NodeRouter() {
    const router = new router_1.Router();
    function listen(port, cb) {
        const _port = typeof port === 'number' ? port : parseInt(port, 10);
        try {
            http_1.default
                .createServer(async (req, res) => {
                await (0, json_1.json)(req, res);
                (0, response_1.enhanceResponse)(res);
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
        path = (0, buildRouteParams_1.buildRouteParams)(path);
        return router.route(method, path, handler);
    }
    const routerFunctions = types_1.methods.reduce((obj, method) => {
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
exports.default = NodeRouter;
//# sourceMappingURL=nodeRouter.js.map