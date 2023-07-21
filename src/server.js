//example
const nodeRouter = require('./nodeRouter')
const port = process.env.PORT || 3000;

const app = nodeRouter()


app.listen(port)
app.get('/', (req, res) => {
	res.end('hello')
})
app.post('/users', (req, res) => {
	const user = req.body
	res.send(user)
})
