define(function(require){
  var sinon = require("sinon");
  return {
    fakeResponse: function(callback) {
      var server = sinon.fakeServer.create();
      callback();
      server.respond();
      server.restore();
    }
  };
});