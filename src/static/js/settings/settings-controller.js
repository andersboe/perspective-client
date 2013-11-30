define(function(require) {

  var template = require('rv!./settings.html');
  var desktopNotifications = require('../notifications/desktop');
  var Ractive = require('Ractive');
  var _ = require('underscore');

  function getMockEvent(el) {
    return JSON.parse(el.querySelector("textarea[name='event']").value);
  }

  function createFilter(e, options) {
    options = options || {};
    var form = e.node;
    var condition = form.querySelector("textarea[name='condition']");
    var action = form.querySelector("textarea[name='action']");

    var conditionFn = createCondition(condition.value);
    var actionFn = createFunction("action", action.value);

    if(!_.isFunction(conditionFn) || !_.isFunction(actionFn)) {
      return null;
    }

    var filter = {
      condition: {
        fn: conditionFn,
        text: condition.value
      },
      action: {
        fn: actionFn,
        text: action.value
      }
    };

    if(options.clear) {
      condition.value = "";
      action.value = "";
      form.querySelector(".match-result").innerHTML = "";
    }

    return filter;
  }

  function createCondition(str) {
    return createFunction("condition", "return " + str);
  }

  function createFunction(label, str) {
    if(str.length === 0) {
      return label + " is empty!";
    }

    try {
      /*jslint evil: true */
      return new Function("event", "util", str);
    } catch(e) {
      return label + " contains invalid JavaScript: " + e;
    }
  }

  return Ractive.extend({
    template: template,
    init: function() {
      this.data.filterExamples = [
        {
          description: "If title contains 'awesome', then pin the title to desktop",
          condition: "event.title.match(/awesome/i)",
          action: 'util.pin({title: event.title, body: event.details})'
        },
        {
          description: "If type is 'build', then briefly shown message on desktop",
          condition: "event.type === 'build'",
          action: 'util.pin({title: event.title, body: event.details, timeToLive: 2000})'
        }
      ];

      this.on({
        setupDesktopNotifications: desktopNotifications.setup,
        updateHandler: function(e) {
          e.original.preventDefault();
          this.data.events.updateFilter(e.index.i, createFilter(e));
        },
        addHandler: function(e) {
          e.original.preventDefault();
          this.data.events.addFilter(createFilter(e, {clear: true}));
        },
        deleteHandler: function(e) {
          this.data.events.removeFilter(e.index.i);
        },
        testFilters: function(e) {
          e.original.preventDefault();
          this.data.events._processEvent(getMockEvent(this.el));
        },
        loadExample: function(e) {
          var index = e.node.selectedIndex - 1;
          if(index < 0) {
            return;
          }

          var example = this.data.filterExamples[index];
          var form = e.node.parentNode;

          form.querySelector("textarea[name='condition']").value = example.condition;
          form.querySelector("textarea[name='action']").value = example.action;
          form.querySelector(".match-result").innerHTML = "";
          e.node.selectedIndex = 0;
        },
        evaluate: function(e) {
          var fn = createCondition(e.node.value);
          var result = fn;
          if(_.isFunction(fn)) {
            try {
              result = fn(getMockEvent(this.el)) ? "Matches mock event" : "Doesn't match mock event";
            } catch(ex) {
              result = "Parse error: " + ex;
            }
          }

          if(e.node.value === "") {
            result = "";
          }

          e.node.parentNode.parentNode.querySelector(".match-result").innerHTML = result;
        }
      });
    }
  });

});