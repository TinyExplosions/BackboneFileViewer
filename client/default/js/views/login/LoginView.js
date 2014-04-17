define([
    'underscore',
    'backbone',
    'hammer',
    'text!templates/login/LoginTemplate.html'
], function(_, Backbone, Hammer, LoginTemplate){

    var LoginView = Backbone.View.extend({
        el: $(".content"),

        initialize: function(options) {
            this.render = _.bind(this.render, this);
            this.render();
        },

        events: {
            'tap .tryLogin': 'tryLogin'
        },

        render: function() {
            var self = this;
            var compiledTemplate = _.template( LoginTemplate, {} );
            this.$el.html( compiledTemplate );
            App.EventBus.trigger("page:rendered",{view: self}, this);
            this.$el.hammer();
            return this;
        },

        tryLogin: function(evt) {
            console.log("try");
            var username = $('#u').val();
            var password = $('#p').val();
            var domain = $('#domain').val();
            $fh.act({
                act: "login",
                req: {u: username, p: password, domain:domain}
            }, function(res){
                console.log("Back From Login",res);
                if(!res.error) {
                    $.cookie('sessionId',res.sessionId);
                    App.router.navigate("users",{trigger: true});
                }
                
            }, function(err){
                // App.showLoadMask();
            });
        }

    });
    return LoginView;
});