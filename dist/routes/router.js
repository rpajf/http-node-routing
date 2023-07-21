"use strict";

function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Adds http verbs as methods to the instance of this library.
 *
 * @param {String} path
 * @return {Route}
 * @public
 */

class Router {
  constructor() {
    _defineProperty(this, "routes", []);
    this.routes = [];
  }
  handleRequest(req, res) {
    const {
      method,
      url
    } = req;
    const route = this.routes.find(route => {
      return route.method === method && route.path === url;
    });
    route.handler(req, res);
    return route;
  }
  addRoute({
    method,
    path,
    handler
  }) {
    this.routes.push({
      method,
      path,
      handler
    });
  }
  post(path, handler) {
    this.addRoute({
      method: 'POST',
      path,
      handler
    });
  }
  get(path, handler) {
    this.addRoute({
      method: 'GET',
      path,
      handler
    });
  }
  put(path, handler) {
    this.addRoute({
      method: 'PUT',
      path,
      handler
    });
  }
  delete(path, handler) {
    this.addRoute({
      method: 'DELETE',
      path,
      handler
    });
  }
}
module.exports = Router;