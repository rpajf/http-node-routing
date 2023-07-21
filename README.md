## Steps
### 2 - Config your env variables
## Basic usage

```javascript
// import the Entity generic class 
import {Entity} from 'restful-generic-entity'


```
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
create an .env file with the `port` variable on the root of the project

