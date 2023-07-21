function enhanceResponse(res) {
  res.send = function(data) {
    if (typeof data === 'object') { 
      data = JSON.stringify(data);
      res.setHeader('Content-Type', 'application/json');
    }

    res.end(data);
  };
}
module.exports = enhanceResponse