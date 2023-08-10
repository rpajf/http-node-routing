import dotenv from 'dotenv';

import { databaseFunctions } from 'src/connection';

import { createNodeRouter } from '../../nodeRouter';
dotenv.config();

const port = process.env.PORT || 3000;

const app = createNodeRouter();

const connection = {
	user: process.env.PG_USER,
	host: process.env.HOST,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	port: process.env.DB_PORT,
};

const { connectDb, getAllRegistersFromTable, insertIntoTable } =
	await databaseFunctions(connection);

app.listen(port, () => console.log(`listening on ${port}`));

connectDb();

app.get('/users', async (req, res) => {
	const registers = await getAllRegistersFromTable('users');
	res.send(registers);
});


app.post('/users', (req, res) => {
	const { email, password } = req.body!;
	const columns = ['email', 'password'];
	const valuesToInsert = [email, password];
	insertIntoTable('users', columns, valuesToInsert, res);
});


