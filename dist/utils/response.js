"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhanceResponse = void 0;
function enhanceResponse(res) {
    res.send = function (data) {
        try {
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }
            return res.end(data);
        }
        catch (err) {
            console.error('Error enhancing response:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'An error occurred while processing your request.' }));
        }
    };
}
exports.enhanceResponse = enhanceResponse;
//# sourceMappingURL=response.js.map