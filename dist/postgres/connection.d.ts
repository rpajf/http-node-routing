import { GetAllFunction, InsertFunction } from 'src/types/index.js';
type connectionObj = {
    user?: string;
    host?: string;
    database?: string;
    password?: string;
    port?: string;
};
export declare const databaseFunctions: (connectionObj: connectionObj) => Promise<{
    connectDb: () => Promise<void>;
    insertIntoTable: InsertFunction;
    getAllRegistersFromTable: GetAllFunction;
}>;
export {};
