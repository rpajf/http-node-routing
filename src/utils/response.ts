import { ServerResponseExtended } from './../types';

export function enhanceResponse(res: ServerResponseExtended) {
	res.send = function (data) {
		if (typeof data === 'object') {
			data = JSON.stringify(data);
			res.setHeader('Content-Type', 'application/json');
		} else if (typeof data === 'string') {
			res.setHeader('Content-Type', 'text/plain');
		}

		res.end(data);
		return res;
	};
}
