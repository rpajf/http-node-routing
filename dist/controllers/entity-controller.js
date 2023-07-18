"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Entity = void 0;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const {
  readUserFromFile,
  writeUsersToFile
} = require('../utils/fileFunctions');
class Entity {
  constructor() {
    _defineProperty(this, "entities", []);
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
    const newEntity = {
      id: this.generateRandomId(),
      ...entity
    };
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
    const entityToFindIndex = this.entities.findIndex(newEntity => newEntity.id === id);
    if (entityToFindIndex === -1) {
      throw new Error('Entity not found');
    }
    this.entities[entityToFindIndex] = {
      ...this.entities[entityToFindIndex],
      ...newEntityData
    };
    await this.persist();
  }
  async delete(id) {
    const entityToFindIndex = this.entities.findIndex(newEntity => newEntity.id === id);
    if (entityToFindIndex === -1) {
      throw new Error('Entity not found');
    }
    this.entities.splice(entityToFindIndex, 1);
    console.log(this.entities);
    await this.persist();
  }
  sayHi() {
    console.log('hello');
  }
}
exports.Entity = Entity;
module.exports = new Entity();