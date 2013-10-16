var express = require('express');
var app = express();

app.configure(function() {
  return app.use(express["static"](__dirname + '/src'));
});

app.all('*', function(request, response) {
  return response.sendfile('./src/index.html');
});

var port = process.env.PORT || 8000;
app.listen(port);

console.log("started server on " + port);