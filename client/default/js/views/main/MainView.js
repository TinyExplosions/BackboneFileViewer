define([
    'underscore',
    'backbone',
    'text!templates/main/MainTemplate.html'
], function(_, Backbone, MainTemplate){

    var MainView = Backbone.View.extend({
        el: $(".content"),

        initialize: function(options) {
            this.render = _.bind(this.render, this);
            this.render();
        },

        render: function() {
            var self = this;
            var compiledTemplate = _.template( MainTemplate, {} );
            this.$el.html( compiledTemplate );
            return this;
        }

    });
    return MainView;
});