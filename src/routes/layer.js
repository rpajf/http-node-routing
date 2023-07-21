const route = require('./route')
class Layer {
  
	constructor(path, handler) {
		this.handler = handler;
		this.name = handler.name || '<anonymous>';
		this.path = path;
    this.stack = []

	}

	requestHandler(...args) {
		const handler = this.handler;
		handler ? handler(...args) : null;
	}


}

module.exports = Layer;
