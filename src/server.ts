import dotenv from 'dotenv';
dotenv.config();
import nodeRouter from './nodeRouter';

const port = process.env.PORT || 3000;

const app = nodeRouter();
type UserRequestBody = {
	name?: string;
	password?: string;
};

app.listen(port, console.log('listen on 3333'));

let users: any = [];
app.get('/users', (req, res) => {
	res.send('hello');
});
app.get('/', (req, res) => {
	res.send('hello');
});
app.post('/users', (req, res) => {
	console.log(req.body);
	const user = req.body;
	users.push(user)
	res.send(user!);
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
