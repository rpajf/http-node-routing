"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readUserFromFile = readUserFromFile;
exports.writeUsersToFile = writeUsersToFile;
var _promises = _interopRequireDefault(require("fs/promises"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function readUserFromFile(path) {
  try {
    const dataPath = new URL(path, import.meta.url);
    const data = await _promises.default.readFile(dataPath, 'utf-8');
    if (data) return JSON.parse(data);
  } catch (error) {
    console.error('Error reading user data:', error);
    return [];
  }
}
async function writeUsersToFile(entities, path) {
  const dataPath = new URL(path, import.meta.url);
  _promises.default.writeFile(dataPath, JSON.stringify(entities)).catch(error => {
    console.error('Error writing user data:', error);
  });
}
process.on('exit', cleanup);
function cleanup() {
  _promises.default.writeFile(dataBasePath, '');
}