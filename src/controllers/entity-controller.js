const {readUserFromFile, writeUsersToFile}= require('../utils/fileFunctions')

export class Entity {
	constructor(entities=[]) {
		this.entities = entities;
		this.initEntities();
	}

	async initEntities() {
		await readUserFromFile();
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
		await writeUsersToFile(this.entities);
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
	sayHi(){
		console.log('hello')
	}
}

module.exports = Entity