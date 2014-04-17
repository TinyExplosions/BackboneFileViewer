define([
    'underscore',
    'backbone',
    'hammer',
    'collections/user/UserCollection',
    'text!templates/user/UserListTemplate.html'
], function(_, Backbone, Hammer, UserCollection, UserListTemplate){

    var UserListView = Backbone.View.extend({
        el: $(".content"),

        initialize: function(options) {
            var self = this;
            this.collection = new UserCollection();
            _.bindAll(this, "renderList");
            this.collection.bind("reset", this.renderList);
        },

        events: {
            'swipe': 'swipeleft',
            'click a': 'click',
            'tap a': 'tap'
        },

        renderList: function() {
            console.log("rendering collection");
            App.HeaderModel.set("title","Users");
            var self = this;
            var compiledTemplate = _.template(UserListTemplate, {users: this.collection.models});
            this.$el.html( compiledTemplate );
            App.EventBus.trigger("page:rendered",{view: self}, this);
            this.$el.hammer();
            return this;
        },

        swipeleft: function(evt) {
            console.log("Swiped Left",evt.target);
            alert("Swiped Left");
        },

        click: function() {
            return false;
        },

        tap: function(evt) {
            console.log("tappit",evt.target);
        }

    });
    return UserListView;
});