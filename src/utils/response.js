function response(res) {
	function end(chunk) {
		try {
			res.writeHead(200, { 'Content-Type': 'text/plain' });
		} catch (error) {
			console.log('error');
		}
    res.end(chunk)
		return chunk;
	}

  function send(chunk){
    const buffer = JSON.parse(Buffer.concat(chunk).toString()) 

    return buffer
  }
}
