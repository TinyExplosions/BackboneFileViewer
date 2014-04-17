define([
    'underscore',
    'backbone',
    'hammer',
    'text!templates/user/UserTemplate.html'
], function(_, Backbone, Hammer, UserTemplate){

    var UserListView = Backbone.View.extend({
        el: $(".content"),

        initialize: function(options) {
            var self = this;
            _.bindAll(this, "render");
            this.model.bind('change', this.render);
        },

        render: function() {
            var self = this;
            console.log("rendering user");
            App.HeaderModel.set("title",this.model.get("username"));
            console.log(self.model.attributes);
            var compiledTemplate = _.template(UserTemplate, this.model.attributes);
            this.$el.html( compiledTemplate );
            App.EventBus.trigger("page:rendered",{view: self}, this);
            this.$el.hammer();
            return this;
        }

    });
    return UserListView;
});