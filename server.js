'use strict';

var server = require('./app.js');
var port = process.env.PORT || 80;

server.listen(port, function() {
  console.log('Server running on port: %d', port);
});
