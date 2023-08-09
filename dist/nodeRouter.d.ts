import { RouteFunction } from './types';
export declare function createNodeRouter(): {
    listen: (port: number | string, cb: any) => void;
    post: RouteFunction;
    get: RouteFunction;
    delete: RouteFunction;
    put: RouteFunction;
    patch: RouteFunction;
};
