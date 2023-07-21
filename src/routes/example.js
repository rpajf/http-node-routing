import { IncomingMessageWithBody } from '../middlewares/json';
import { buildRouteParams } from '../utils/buildRouteParams';
import path from 'path'
import { dataBasePath } from '../utils/fileFunctions';
import {Entity} from 'restful-generic-entity'
import http from 'http';


const PATH_TO_DB = '../mockDb/db.txt'
const thisPath = path.join(PATH_TO_DB, import.meta.url)
// console.log( new URL('../mockDb/db.txt', import.meta.url));
const users = new Entity([], dataBasePath.pathname);



// this will be handled by the library
export const routes = [
	{
		method: 'POST',
		handler: async (req, res) => {
			const { name, password } = req.body;
			const user = { name, password };
			await users.create(user);
			res.writeHead(200);
			res.end('Created user');
		},
		path: buildRouteParams('/users'),
	},
	{
		method: 'GET',
		handler: async (req, res) => {
			const allUsers = users.list();
			res.end(JSON.stringify(allUsers));
		},
		path: buildRouteParams('/users'),
	},
	{
		method: 'PUT',
		handler: async (req, res) => {
			const userTofindIndex = Number(req.params.id.replace(/\D/g, ''));

			if (!userTofindIndex) {
				res.writeHead(404);

				res.end(JSON.stringify({ message: 'Bad request' }));
			} else {
				const { name, password } = req.body;
				const newUserData = { name, password };
				try {
					console.log('here');
					users.edit(userTofindIndex, newUserData);
					res.end('Edited user');
				} catch (error) {
					console.log(error);
				}
			}
		},
		path: buildRouteParams('/users/:id'),
	},
	{
		method: 'DELETE',
		handler: async (req, res) => {
			const userTofindIndex = Number(req.params.id.replace(/\D/g, ''));

			if (!userTofindIndex) {
				res.writeHead(404);
				res.end(JSON.stringify({ message: 'Bad request' }));
			} else {
				try {
					users.delete(userTofindIndex);
					res.end('delete user');
				} catch (error) {
					console.log(error);
				}
			}
		},
		path: buildRouteParams('/users/:id'),
	},
];
