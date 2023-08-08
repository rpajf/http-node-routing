import pg from 'pg';
const {Client, Pool} = pg
import {
	GetAllFunction,
	DeleteFunction,
	InsertFunction,
	UpdateFunction,
} from 'src/types';


type connectionObj = {
	user?: string;
	host?: string;
	database?: string;
	password?: string;
	port?: string;
};

export const connectDb = async ({ connectionObj }: any) => {
	const { user, host, database, password, port } = connectionObj;
	const client = new Client({ user, host, database, password, port });
	await client.connect();
	console.log('connected');
};

export const databaseFunctions = async (connectionObj: connectionObj) => {
	const { user, host, database, password, port } = connectionObj;
	const numericPort = parseInt(port!, 10);
	const client = new Client({
		user,
		host,
		database,
		password,
		port: numericPort,
	});
	
	const insertIntoTable: InsertFunction = async (table, columns, values) => {
		const placeholders = values.map((_, index) => `$${index + 1}`).join(',');
		console.log('placeholders', placeholders);
		const queryCommand = `INSERT INTO ${table} (${columns.join(
			','
		)}) VALUES (${placeholders})`;
		await client.query(queryCommand, values);
	};
	const getAllRegistersFromTable: GetAllFunction = async (table) => {
		const queryCommand = `SELECT * FROM ${table}`;
		const result = await client.query(queryCommand);
		return await result.rows;
	};
	return {
		connectDb: async () => {
			console.log('connected to db');
			await client.connect();
		},
		insertIntoTable,
		getAllRegistersFromTable,
	};
};
