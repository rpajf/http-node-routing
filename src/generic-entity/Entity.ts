import { readUserFromFile, writeUsersToFile } from 'src/utils/fileFunctions';
import { IEntity } from 'src/types';

export class Entity<T extends IEntity> {
	private entities: T[];
	public path: string;

	constructor(entities: T[] = [], path: string) {
		this.entities = entities;
		this.path = path;
		this.initEntities();
	}

	async initEntities() {
		// will change to handle table from POSTGRES
		await readUserFromFile(this.path);
	}
	generateRandomId() {
		const id = Math.floor(Math.random() * 10) + 1;
		return id.toString();
	}
	async create(entity: Omit<T, 'id'>) {
		const newEntity: T = { id: this.generateRandomId(), ...entity } as T;
		this.entities.push(newEntity);
		await this.persist();
	}
	list() {
		return this.entities;
	}
	async persist() {
		await writeUsersToFile(this.entities, this.path);
	}
	async edit(id: string, newEntityData: Partial<IEntity>) {
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
	async delete(id: string) {
		const entityToFindIndex = this.entities.findIndex(
			(newEntity) => newEntity.id === id
		);
		if (entityToFindIndex === -1) {
			throw new Error('Entity not found');
		}
		this.entities.splice(entityToFindIndex, 1);
		await this.persist();
	}
}
