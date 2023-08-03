"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const nodeRouter_1 = require("../nodeRouter");
const port = process.env.PORT || 3000;
const app = (0, nodeRouter_1.createNodeRouter)();
app.listen(port, () => console.log(`listening on ${port}`));
let users = [];
app.get('/users', (req, res) => {
    res.send('hello');
});
app.get('/', (req, res) => {
    res.send('hello');
});
app.post('/users', (req, res) => {
    console.log(req.body);
    const user = req.body;
    users.push(user);
    res.send(user);
});
app.put('/users/:id', (req, res) => {
    const userProps = req.params;
    const { name, password } = req.body;
    const index = users.findIndex((user) => user.id === userProps?.id);
    if (index === -1) {
        res.end(404).send({ error: 'User not found' });
        return;
    }
    users[index] = { id: userProps?.id, name, password };
    res.send(users[index]);
});
//# sourceMappingURL=server.js.map