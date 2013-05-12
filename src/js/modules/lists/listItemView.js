define(function(require) {

  var View = require('base/view'),
    listItemTemplate = require('hb!./listItem');

  var ListItem = View.extend({

    tagName: 'li',

    template: listItemTemplate,

    events: {
      'dragend': 'dragend'
    },

    bindings: {
      '.title': 'title'
    },

    dragend: function() {
      this.trigger('priorityChanged', this.model);
    },

    render: function() {
      this.renderTemplate();
      this.stickit(this.model);
      this.$el.attr('data-id', this.model.get('id'));
      return this;
    }

  });

  return ListItem;

});