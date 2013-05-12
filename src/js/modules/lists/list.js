define(function(require) {
  var Collection = require('base/collection');

  var List = Collection.extend({
    comparator: 'priority'
  });

  return List;
});