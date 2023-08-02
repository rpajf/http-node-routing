# http-node-routing
# 
This project was motivated by the will of understanding how things work. Im mainly using node http module to add the request verbs as methods to the library. My plan is to create a small lib that provides CRUD, an generic entity that can peform these operations on a POSTGRES database. It should be used mainly for educational propurses.
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
### 1 - Config your env variables

create an .env file with the `port` variable on the root of the project

### 2 - Usage example

```javascript

import nodeRouter from './nodeRouter';

const port = process.env.PORT || 3000;

const app = nodeRouter()

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
### still in progress...
Handle the req.params and req.query
Finishing the methods put and delete
Creating the connection with databases (postgres and mysql)

