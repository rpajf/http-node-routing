import http from 'http';
//example
import dotenv from 'dotenv';
dotenv.config();
import nodeRouter from './nodeRouter';

const port = process.env.PORT || 3000;

const app = nodeRouter();

app.listen(3333, console.log('listen on 3333'));
// app.routes.get('/', (req:any, res:any) => {
// 	res.send('hello');
// });
app.get('/', (req:any, res:any) => {
	res.send('hello');
});

app.post('/users', (req, res) => {
	// console.log(req, res)
	console.log(req.body)
	const user = req.body;
	res.send(user!);
});
