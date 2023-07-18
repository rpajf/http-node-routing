import fs from 'fs/promises';

export const dataBasePath = new URL('../mockDb/db.txt', import.meta.url);

export async function readUserFromFile() {
	try {
		const data = await fs.readFile(dataBasePath, 'utf-8');

		if (data) return JSON.parse(data);
	} catch (error) {
		console.error('Error reading user data:', error);
		return [];
	}
}

export async function writeUsersToFile(
	entities
) {
	fs.writeFile(dataBasePath, JSON.stringify(entities)).catch((error) => {
		console.error('Error writing user data:', error);
	});
}
process.on('exit', cleanup);
function cleanup() {
	fs.writeFile(dataBasePath, '');
}
