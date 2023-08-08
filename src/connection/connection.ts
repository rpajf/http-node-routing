import { Pool, Client } from 'pg';

interface TableValues {
	value: string;
}
type RelationalFunctions = {
	fn: (table: string) => Promise<void>;
};
type InsertIntoTableFunction = {

}
const connection = {
	user: 'postgres',
	host: 'localhost',
	database: 'testdb',
	password: 'asdf',
	port: 5432,
};
const pool = new Pool(connection);

const client = new Client(connection);
export const connectDb = async () => {
	await client.connect();
	console.log('connected');
};
const getUsers = async () => {
	await client
		.query('SELECT * FROM users')
		.then((user) => console.log(user.rows));
};

export const insertIntoTable: (
	table: string,
	columns: string[],
	values: any[]
) => Promise<void> = async (table, columns, values) => {
	const placeholders = values.map((_, index) => `$${index + 1}`).join(',');
	console.log('placeholders', placeholders);
	const queryCommand = `INSERT INTO ${table} (${columns.join(
		','
	)}) VALUES (${placeholders})`;
	await client.query(queryCommand, values);
};
export const getAllRegistersFromTable: (
	table: string
) => Promise<void> = async(table) => {
	const queryCommand = `SELECT * FROM ${table}`
	await client.query(queryCommand)
};
const columns = ['id', 'name', 'password'];
const valuesToInsert = [11, 'User1', 123456];

// insertIntoTable('users', columns, valuesToInsert);
// getUsers();
