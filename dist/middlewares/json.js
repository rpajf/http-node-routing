var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
export async function json(req, res) {
    var _a, e_1, _b, _c;
    if (req.method !== 'GET' && req.method !== 'DELETE') {
        const buffers = [];
        try {
            for (var _d = true, req_1 = __asyncValues(req), req_1_1; req_1_1 = await req_1.next(), _a = req_1_1.done, !_a; _d = true) {
                _c = req_1_1.value;
                _d = false;
                const chunk = _c;
                buffers.push(chunk);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = req_1.return)) await _b.call(req_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        const jsonString = Buffer.concat(buffers).toString();
        if (jsonString !== '') {
            try {
                req.body = JSON.parse(jsonString);
                res.setHeader('Content-Type', 'application/json');
            }
            catch (error) {
                console.error('Error parsing request body:', error);
                // Send a 400 Bad Request error to the client
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON in request body.' }));
                return;
            }
        }
    }
}
//# sourceMappingURL=json.js.map