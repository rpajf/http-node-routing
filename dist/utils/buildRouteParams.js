"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRouteParams = void 0;
const buildRouteParams = path => {
  const routeParamsRegex = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replace(routeParamsRegex, '(?<$1>[a-z0-9-_]+)');
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);
  return pathRegex;
};
exports.buildRouteParams = buildRouteParams;