import dotenv from 'dotenv';

import { createNodeRouter } from '../../nodeRouter';
dotenv.config();

const port = process.env.PORT || 3000;

const app = createNodeRouter();
type UserRequestBody = {
	id?: string;
	name?: string;
	password?: string;
};

app.listen(port, () => console.log(`listening on ${port}`));

let users: UserRequestBody[] = [];

app.get('/users', async (req, res) => {
	console.log(users);
	res.send(users);
});

app.get('/', (req, res) => {
	res.send('hello');
});

app.post('/users', (req, res) => {
	const { name, password } = req.body!;
	const id = (Math.floor(Math.random() * 10) + 1).toString();
	const user = { id, name, password };
	users.push(user);
	res.send(user);
});

app.put('/users/:id', (req, res) => {
	const userProps = req.params;
	const { name, password } = req.body!;

	const index = users.findIndex(
		(user: UserRequestBody) => user.id === userProps?.id
	);
	if (index === -1) {
		res.end(404).send({ error: 'User not found' });
		return;
	}

	users[index] = { id: userProps?.id, name, password };
	res.send(users[index]);
});
app.delete('/users/:id', (req, res) => {
	const userProps = req.params;
	const { name, password } = req.body!;

	const index = users.findIndex(
		(user: UserRequestBody) => user.id === userProps?.id
	);
	if (index === -1) {
		res.end(404).send({ error: 'User not found' });
		return;
	}

	users[index] = { id: userProps?.id, name, password };
	res.send(users[index]);
});
