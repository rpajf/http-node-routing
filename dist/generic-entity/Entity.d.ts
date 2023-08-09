import { IEntity } from 'src/types';
export declare class Entity<T extends IEntity> {
    private entities;
    path: string;
    constructor(entities: T[] | undefined, path: string);
    initEntities(): Promise<void>;
    generateRandomId(): string;
    create(entity: Omit<T, 'id'>): Promise<void>;
    list(): T[];
    persist(): Promise<void>;
    edit(id: string, newEntityData: Partial<IEntity>): Promise<void>;
    delete(id: string): Promise<void>;
}
