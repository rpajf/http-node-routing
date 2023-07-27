//example
import dotenv from 'dotenv'
dotenv.config()
import nodeRouter from './nodeRouter'
const port = process.env.PORT || 3000;

const app = nodeRouter()


app.listen(Number(port))
app.get('/', (req, res) => {
	res.send('hello')
})
app.post('/users', (req, res) => {
	const user = req.body
	res.send(user)
})
