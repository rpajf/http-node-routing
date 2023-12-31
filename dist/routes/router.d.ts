/// <reference types="node" />
import { IncomingMessageWithBody } from './../middlewares/json.js';
import { ServerResponseExtended } from './../types/index.js';
import { IncomingMessage } from 'http';
import { Route } from '../types/index.js';
export declare class Router {
    private routes;
    constructor();
    handleRequest(req: IncomingMessageWithBody<IncomingMessage>, res: ServerResponseExtended): void;
    addRoute(route: Route): void;
    handleError(error: string | unknown, res: ServerResponseExtended): void;
    route(method: string, path: RegExp, handler: (req: IncomingMessage, res: ServerResponseExtended) => void): void;
}
