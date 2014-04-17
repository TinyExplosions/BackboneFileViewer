define([
    'underscore',
    'backbone',
    'models/header/HeaderModel',
    'text!templates/header/HeaderTemplate.html',
    'utils'
], function(_, Backbone, HeaderModel, HeaderTemplate, Utils){

    var HeaderView = Backbone.View.extend({
        el: $("header"),
        model: new HeaderModel(),

        initialize: function(options) {
            App.HeaderModel = this.model;
            var self = this;
            this.render = _.bind(this.render, this);
            this.model.bind('change', this.render);
            this.render();
        },

        events: {
            "click .refresh": "refreshRemote"
        },

        render: function() {
            // Set `document` title to be the same as the Header title
            document.title = this.model.get("title");
            var compiledTemplate = _.template( HeaderTemplate, this.model.attributes );
            this.$el.html( compiledTemplate );
            return this;
        },

        refreshRemote: function() {
            $('body').addClass("loading");
            App.DocCollection.fetch({success: function(){
                Utils.mergeLists();
                // setTimeout(function() {
                    $('body').removeClass("loading");
                // }.bind(this), 4000);
            }});
        }

    });

    return HeaderView;

});