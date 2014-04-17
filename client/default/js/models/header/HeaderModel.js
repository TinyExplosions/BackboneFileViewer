define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var HeaderModel = Backbone.Model.extend({
    // Default values.
    defaults : {
        title: ""
    }
  });
  return HeaderModel;
});