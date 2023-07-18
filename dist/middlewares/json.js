"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.json = json;
async function json(req, res) {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }
  res.setHeader('Content-Type', 'application/json');
}
module.exports = json;