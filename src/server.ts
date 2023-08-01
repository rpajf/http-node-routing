import dotenv from 'dotenv';
dotenv.config();
import nodeRouter from './nodeRouter';

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const app = nodeRouter();

app.listen(port, console.log('listen on 3333'));

app.get('/', (req:any, res:any) => {
	res.send('hello');
});

app.post('/users', (req, res) => {
	// console.log(req, res)
	console.log(req.body)
	const user = req.body;
	res.send(user!);
});

app.put('/users/:id', (req, res) => {
	// console.log(req, res)

	console.log(req.body)
	const user = req.body;
	res.send(user!);
});
