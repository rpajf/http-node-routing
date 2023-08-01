import { IEntity } from 'src/types';
import fs from 'fs/promises';
export const dataBasePath = new URL('../mockDb/db.txt', import.meta.url);

export async function readUserFromFile(path: string) {
	try {
		const data = await fs.readFile(path, 'utf-8');

		if (data) return JSON.parse(data);
	} catch (error) {
		console.error('Error reading user data:', error);
		return [];
	}
}

export async function writeUsersToFile<T extends IEntity>(
	entities: T[],
	path: string
): Promise<void> {
	fs.writeFile(path, JSON.stringify(entities)).catch((error) => {
		console.error('Error writing user data:', error);
	});
}
process.on('exit', cleanup);
function cleanup() {
	fs.writeFile(dataBasePath, '');
}
