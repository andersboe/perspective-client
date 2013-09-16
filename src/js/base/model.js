define(function(require) {

  var _ = require('underscore');
  var Backbone = require('backbone');
  var ajaxSync = require('components/ajaxSync');
  var config = require('../config');

  return Backbone.Model.extend({

    sync: ajaxSync({baseUrl: config.serverUrl}),

    mergeAttributes: function(removeProps, addProps) {
      var changeSet = {};

      for(var key in addProps) {
        if(addProps.hasOwnProperty(key)) {
          var value = addProps[key];

          if(_.isArray(value)) {
            var valuesToAdd = addProps[key],
                valuesToRemove = removeProps[key],
                currentValues = this.get(key) || [],
                mergedValues = _.difference(currentValues, valuesToRemove).concat(valuesToAdd);

            changeSet[key] = _.uniq(mergedValues);
          } else {
            changeSet[key] = value;
          }
        }
      }

      this.set(changeSet);
    }
  });

});