define(function(require) {

  var DragAndDrop = require('drag-and-drop/drag-and-drop');

  return function(node, fire) {

    var dragAndDrop = new DragAndDrop(node, fire);
    dragAndDrop.startListeners();

    return {
      update: dragAndDrop.startListeners,
      teardown: dragAndDrop.stopListeners
    };
  };

});