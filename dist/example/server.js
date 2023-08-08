import dotenv from 'dotenv';
import { databaseFunctions } from 'src/connection';
import { createNodeRouter } from '../nodeRouter';
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
const { connectDb, getAllRegistersFromTable, insertIntoTable } = await databaseFunctions(connection);
app.listen(port, () => console.log(`listening on ${port}`));
let users = [];
connectDb();
app.get('/users', async (req, res) => {
    const registers = await getAllRegistersFromTable('users');
    res.send(registers);
});
app.get('/', (req, res) => {
    res.send('hello');
});
app.post('/users', (req, res) => {
    const { id, name, password } = req.body;
    const columns = ['id', 'name', 'password'];
    const valuesToInsert = [id, name, password];
    insertIntoTable('users', columns, valuesToInsert);
});
app.put('/users/:id', (req, res) => {
    const userProps = req.params;
    const { name, password } = req.body;
    const index = users.findIndex((user) => user.id === (userProps === null || userProps === void 0 ? void 0 : userProps.id));
    if (index === -1) {
        res.end(404).send({ error: 'User not found' });
        return;
    }
    users[index] = { id: userProps === null || userProps === void 0 ? void 0 : userProps.id, name, password };
    res.send(users[index]);
});
//# sourceMappingURL=server.js.map