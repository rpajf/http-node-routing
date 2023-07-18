import fs from 'fs/promises';


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
	entities,
	path
) {

	const dataPath = new URL(path, import.meta.url);
	fs.writeFile(dataPath, JSON.stringify(entities)).catch((error) => {
		console.error('Error writing user data:', error);
	});
}
process.on('exit', cleanup);
function cleanup() {
	fs.writeFile(dataBasePath, '');
}
