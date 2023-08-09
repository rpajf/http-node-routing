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
const { connectDb, getAllRegistersFromTable, insertIntoTable } = await databaseFunctions(connection);
app.listen(port, () => console.log(`listening on ${port}`));
connectDb();
app.get('/users', async (req, res) => {
    const registers = await getAllRegistersFromTable('users');
    res.send(registers);
});
app.post('/users', (req, res) => {
    const { id, name, password } = req.body;
    const columns = ['id', 'name', 'password'];
    const valuesToInsert = [id, name, password];
    insertIntoTable('users', columns, valuesToInsert);
    res.send('Users created');
});
//# sourceMappingURL=index.js.map