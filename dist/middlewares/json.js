export async function json(req, res) {
    if (req.method !== 'GET' && req.method !== 'DELETE') {
        const buffers = [];
        for await (const chunk of req) {
            buffers.push(chunk);
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