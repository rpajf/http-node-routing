"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRegistersFromTable = exports.insertIntoTable = exports.connectDb = void 0;
const pg_1 = require("pg");
const connection = {
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: 'asdf',
    port: 5432,
};
const pool = new pg_1.Pool(connection);
const client = new pg_1.Client(connection);
const connectDb = async () => {
    await client.connect();
    console.log('connected');
};
exports.connectDb = connectDb;
const getUsers = async () => {
    await client
        .query('SELECT * FROM users')
        .then((user) => console.log(user.rows));
};
const insertIntoTable = async (table, columns, values) => {
    const placeholders = values.map((_, index) => `$${index + 1}`).join(',');
    console.log('placeholders', placeholders);
    const queryCommand = `INSERT INTO ${table} (${columns.join(',')}) VALUES (${placeholders})`;
    await client.query(queryCommand, values);
};
exports.insertIntoTable = insertIntoTable;
const getAllRegistersFromTable = async (table) => {
    const queryCommand = `SELECT * FROM ${table}`;
    const result = await client.query(queryCommand);
    return result.rows;
};
exports.getAllRegistersFromTable = getAllRegistersFromTable;
//# sourceMappingURL=connection.js.map