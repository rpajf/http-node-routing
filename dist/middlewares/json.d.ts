/// <reference types="node" />
import http from 'http';
export interface IncomingMessageWithBody<T> extends http.IncomingMessage {
    params?: {
        [key: string]: string;
    };
    body?: Record<string, any>;
}
export declare function json<T>(req: IncomingMessageWithBody<T>, res: http.ServerResponse): Promise<void>;
