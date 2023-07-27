import http from 'http';
//example
import dotenv from 'dotenv';
dotenv.config();
import nodeRouter from './nodeRouter';
import { ServerResponseExtended } from './types';
const port = process.env.PORT || 3000;

const app = nodeRouter();

app.listen(3333);
app.routes.get('/', (req:any, res:any) => {
	res.send('hello');
});

app.routes.post('/users', (req, res) => {
	console.log(req, res)
	// const user = req.body;
	// res.send(user);
});
