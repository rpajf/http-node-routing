import { ServerResponseExtended } from './../types';

export function enhanceResponse(res: ServerResponseExtended) {
	res.send = function (data) {
			try {
					if (typeof data === 'object') {
							data = JSON.stringify(data);
					} 
					return res.end(data);
			} catch (err) {
					console.error('Error enhancing response:', err);
					res.statusCode = 500;
					res.end(JSON.stringify({ error: 'An error occurred while processing your request.' }));
			}
	};
}





