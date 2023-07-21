const http = require('http');
const json = require('./middlewares/json');
const Router = require('./routes/router');
const nodeRouter = require('./nodeRouter')
const port = process.env.PORT || 3000;
const Route =  require('./routes/route')

function injectAttrsReq(method) {}
// injetar um metodo com cada verbo
// - get post put
// const nodeRouter = new NodeRouter()
const app = nodeRouter()


app.listen(port)
app.get('/', (req, res) => {
	res.end('hello')
})
app.post('/users', (req, res) => {
	const user = req.body
	return user
})
