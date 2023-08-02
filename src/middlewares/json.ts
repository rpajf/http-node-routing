import http from 'http';
export interface IncomingMessageWithBody<T> extends http.IncomingMessage {
	params?: { [key: string]: string };
	body?: T | null;
}

export async function json<T>(
	req: IncomingMessageWithBody<T>,
	res: http.ServerResponse
) {
	if (req.method !== 'GET' || 'DELETE') {
		const buffers: Buffer[] = [];
		for await (const chunk of req) {
			buffers.push(chunk);
		}
		const jsonString = Buffer.concat(buffers).toString();
		if (jsonString !== '') {
			try {
				req.body = JSON.parse(jsonString);
			} catch (error) {
				console.error('Error parsing request body:', error);
				// Send a 400 Bad Request error to the client
				res.statusCode = 400;
				res.end(JSON.stringify({ error: 'Invalid JSON in request body.' }));
				return;
			}
		}
	}

	res.setHeader('Content-Type', 'application/json');
}
