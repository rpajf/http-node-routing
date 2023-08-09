/// <reference types="node" />
import { IncomingMessageWithBody } from './../middlewares/json';
import { ServerResponseExtended } from './../types';
import { IncomingMessage } from 'http';
import { Route } from '../types';
export declare class Router {
    private routes;
    constructor();
    handleRequest(req: IncomingMessageWithBody<IncomingMessage>, res: ServerResponseExtended): void;
    addRoute(route: Route): void;
    route(method: string, path: RegExp, handler: (req: IncomingMessage, res: ServerResponseExtended) => void): void;
}
