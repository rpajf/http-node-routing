# http-node-routing
# 
This project was motivated by the will of understanding how things work. Im mainly using node http module to provide a router to handle HTTPS requests and responses. On future versions i will use  a generic entity that can peform these operations on a POSTGRES database. It should be used mainly for educational propurses. Currently has support for postgresql
### Technologies used
[![My Skills](https://skillicons.dev/icons?i=typescript,nodejs,vscode&theme=dark)](https://skillicons.dev)

## Steps
### 1 - Installation
install 
```javascript
npm install http-node-routing
```
install dotenv
```javascript
npm install dotenv
```
inside the file that you instance the server
```javascript
import dotenv from 'dotenv';
dotenv.config();
```

### 1 - Config your env variables

create an .env file with the `port` variable on the root of the project

### 2 - Simple usage example
check folder examples for the basic and the examples that persists data into the database
```javascript
src/examples
```
```javascript

import router from 'http-node-routing'

const port = process.env.PORT || 3000;

const app = router()

app.listen(port, () => console.log(`listening on ${port}`))
app.get('/', (req, res) => {
	res.send('Hello World')
})
app.post('/users', (req, res) => {
	const user = req.body
	res.send(user)
})

```
### Usage with postgres
1 - Start your postgres server

2 - Add the port that the server is running into the database key attribute from
connection object

2 - Pass the table that you will perform the CRUD operations on the routes address

Disclaimer: I have added only SELECT and INSERT operations for now

```javascript
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
```
## Clone the repo
```javascript
git clone https://github.com/rpajf/http-node-routing
```
run for the basic example:
```javascript
npm run start:basic
```

run for the persisting into postgres example:
```javascript
npm run start:db
```
## Support for other databases rather than postgres
Im implementing support for sqlite3 and mysql
## How to contribute? 
1 - Implement other methods for the CRUD operations on the Postgres databse

2 - Add more tests to the library routing

### still in progress...

### next steps: 
- Handle the req.params and req.query 
- Creating the connection with databases (postgres and mysql)

