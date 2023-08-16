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

### 2 - Usage example
or check folder examples for the basic and the examples that persists data into the database
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
or clone the repo
```javascript
git clone https://github.com/rpajf/http-node-routing
```
## Support for other databases rather than postgres
Im implementing support for sqlite3 and mysql
### still in progress...
### next steps: 
- Handle the req.params and req.query 
- Creating the connection with databases (postgres and mysql)

