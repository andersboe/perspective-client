define(function() {

  function foreach(n, next) {
    if (n.length) {
      Array.prototype.forEach.call(n, next);
    }
  }

  var DragAndDrop = function(options) {
    var callback = options.callback || function() {};
    var node = options.node;
    var currentlyDraggingElement = null;

    var dragDrop = this;

    return {
      startHandler: function() {
        this.classList.add('sortable-dragging');
        currentlyDraggingElement = this;
      },
      overHandler: function(e) {
        if (!currentlyDraggingElement) {
          return true;
        }

        if (e.preventDefault) {
          e.preventDefault();
        }

        this.classList.add('sortable-placeholder');

        return false;
      },
      enterHandler: function() {
        if (!currentlyDraggingElement || currentlyDraggingElement === this) {
          return true;
        }

        dragDrop.moveElementNextTo(currentlyDraggingElement, this);

        return false;
      },
      leaveHandler: function() {
        this.classList.remove('sortable-placeholder');
      },
      dropHandler: function(e) {
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        if (e.preventDefault) {
          e.preventDefault();
        }

        this.classList.remove('sortable-placeholder');

        var next = dragDrop.findNext(currentlyDraggingElement);
        var prev = dragDrop.findPrevious(currentlyDraggingElement);

        callback({
          draggedElement: currentlyDraggingElement,
          nextElement: next,
          previousElement: prev,
          node: node
        });

        return false;
      },
      endHandler: function() {
        currentlyDraggingElement = null;
        this.classList.remove('sortable-dragging');
      }
    };
  };

  DragAndDrop.prototype.findNext = function(element) {
    var next = element.nextSibling;

    while(next && next.nodeType !== 1) {
      if (next === element) {
        next = next.nextSibling;
      } else {
        next = next.nextSibling;
      }
    }

    return next;
  };

  DragAndDrop.prototype.findPrevious = function(element) {
    var prev = element.previousSibling;

    while(prev && prev.nodeType !== 1) {
      if (prev === element) {
        prev = prev.previousSibling;
      } else {
        prev = prev.previousSibling;
      }
    }

    return prev;
  };

  DragAndDrop.prototype.moveElementNextTo = function(element, elementToMoveNextTo) {
      if (this.isBelow(element, elementToMoveNextTo)) {
        elementToMoveNextTo.parentNode.insertBefore(element, elementToMoveNextTo);
      }
      else {
        elementToMoveNextTo.parentNode.insertBefore(element, elementToMoveNextTo.nextSibling);
      }
    };

  DragAndDrop.prototype.isBelow = function(element1, element2) {
    if (element2.parentNode !== element1.parentNode) {
      return false;
    }

    var cur = element1.previousSibling;
    while (cur && cur.nodeType !== 9) {

      if (cur === element2) {
        return true;
      }

      cur = cur.previousSibling;
    }

    return false;
  };

  return function(node, callback) {
    var dragAndDrop = new DragAndDrop({node: node, callback: callback});

    return {
      startListeners: function() {
        foreach(node.children, function (el) {
          el.draggable = true;
          el.addEventListener('dragstart', dragAndDrop.startHandler);
          el.addEventListener('dragenter', dragAndDrop.enterHandler);
          el.addEventListener('dragover', dragAndDrop.overHandler);
          el.addEventListener('dragleave', dragAndDrop.leaveHandler);
          el.addEventListener('drop', dragAndDrop.dropHandler);
          el.addEventListener('dragend', dragAndDrop.endHandler);
        });
      },
      stopListeners: function() {
        foreach(node.children, function (el) {
          el.draggable = false;
          el.removeEventListener('dragstart', dragAndDrop.startHandler);
          el.removeEventListener('dragenter', dragAndDrop.enterHandler);
          el.removeEventListener('dragover', dragAndDrop.overHandler);
          el.removeEventListener('dragleave', dragAndDrop.leaveHandler);
          el.removeEventListener('drop', dragAndDrop.dropHandler);
          el.removeEventListener('dragend', dragAndDrop.endHandler);
        });
      }
    };
  };
});