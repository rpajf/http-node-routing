const {readUserFromFile, writeUsersToFile}= require('../utils/fileFunctions')

export class Entity {
	constructor(entities=[], path) {
		this.entities = entities;
		this.path = path
		this.initEntities();
	}

	async initEntities() {
		// will change to handle table from POSTGRES
		await readUserFromFile(this.path);
	}
	generateRandomId() {
		const id = Math.floor(Math.random() * 10) + 1;
		return id;
	}
	async create(entity) {
		const newEntity = { id: this.generateRandomId(), ...entity }
		this.entities.push(newEntity);
		await this.persist();
	}
	list() {
		return this.entities;
	}
	async persist() {
		await writeUsersToFile(this.entities, this.path);
	}
	async edit(id, newEntityData) {
		const entityToFindIndex = this.entities.findIndex(
			(newEntity) => newEntity.id === id
		);
		if (entityToFindIndex === -1) {
			throw new Error('Entity not found');
		}
		this.entities[entityToFindIndex] = {
			...this.entities[entityToFindIndex],
			...newEntityData,
		};
		await this.persist();
	}
	async delete(id) {
		const entityToFindIndex = this.entities.findIndex(
			(newEntity) => newEntity.id === id
		);
		if (entityToFindIndex === -1) {
			throw new Error('Entity not found');
		}
		this.entities.splice(entityToFindIndex, 1)
		console.log(this.entities)
		await this.persist();
	}
}

module.exports = Entity