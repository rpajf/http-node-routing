import dotenv from 'dotenv';

import { insertIntoTable, connectDb } from 'src/connection/connection';
import { createNodeRouter } from '../nodeRouter';
dotenv.config();

const port = process.env.PORT || 3000;

const app = createNodeRouter();
type UserRequestBody = {
	name?: string;
	password?: string;
};

app.listen(port, () => console.log(`listening on ${port}`));

let users: any = [];
connectDb();
app.get('/users', (req, res) => {
	res.send('hello');
});
app.get('/', (req, res) => {
	res.send('hello');
});
app.post('/users', (req, res) => {
	const { id, name, password } = req.body!;
	const columns = ['id', 'name', 'password'];
	const valuesToInsert = [id, name, password];
	insertIntoTable('users', columns, valuesToInsert);
});

app.put('/users/:id', (req, res) => {
	const userProps = req.params;
	const { name, password }: UserRequestBody = req.body as UserRequestBody;

	const index = users.findIndex(
		(user: { id: string | undefined }) => user.id === userProps?.id
	);
	if (index === -1) {
		res.end(404).send({ error: 'User not found' });
		return;
	}

	users[index] = { id: userProps?.id, name, password };
	res.send(users[index]);
});
