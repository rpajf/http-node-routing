## Steps
### 1 - Config your env variables
create an .env file with the `port` variable on the root of the project

### 2 - Usage example

```javascript

const nodeRouter = require('./nodeRouter')
const port = process.env.PORT || 3000;

const app = nodeRouter()


app.listen(port)
app.get('/', (req, res) => {
	res.send('hello')
})
app.post('/users', (req, res) => {
	const user = req.body
	res.send(user)
})

```

### still in progress...
Handle the req.params and req.query
Finishing the methods put and delete
Creating the connection with databases (postgres and mysql)

