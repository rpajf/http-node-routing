export const buildRouteParams = (path) => {
    const routeParamsRegex = /:([a-zA-Z]+)/g;
    const pathWithParams = path.replace(routeParamsRegex, '(?<$1>[a-z0-9-_]+)');
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);
    return pathRegex;
};
//# sourceMappingURL=buildRouteParams.js.map