"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataBasePath = void 0;
exports.readUserFromFile = readUserFromFile;
exports.writeUsersToFile = writeUsersToFile;
var _promises = _interopRequireDefault(require("fs/promises"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const dataBasePath = new URL('../mockDb/db.txt', import.meta.url);
exports.dataBasePath = dataBasePath;
async function readUserFromFile() {
  try {
    const data = await _promises.default.readFile(dataBasePath, 'utf-8');
    if (data) return JSON.parse(data);
  } catch (error) {
    console.error('Error reading user data:', error);
    return [];
  }
}
async function writeUsersToFile(entities) {
  _promises.default.writeFile(dataBasePath, JSON.stringify(entities)).catch(error => {
    console.error('Error writing user data:', error);
  });
}
process.on('exit', cleanup);
function cleanup() {
  _promises.default.writeFile(dataBasePath, '');
}