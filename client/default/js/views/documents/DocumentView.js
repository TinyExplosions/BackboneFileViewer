define([
    'underscore',
    'backbone',
    'hammer',
    'models/document/DocumentModel',
    'text!templates/documents/DocNotFoundTemplate.html'
], function( _, Backbone, Hammer, DocumentModel, DocNotFoundTemplate ){

    var DocumentView = Backbone.View.extend({
        el: $(".content"),

        initialize: function( options ) {
            this.model = new DocumentModel();
            if(options.docid) {
                this.model.set( 'id', options.docid);
            }
            _.bindAll( this, 'render' );
            this.model.on( 'error', this.defaultErrorHandler, this );
            this.model.bind( 'change', this.render );
        },

        render: function() {
            var self = this;
            console.log( "rendering user" );
            App.HeaderModel.set( "title",this.model.get("username") );
            console.log( self.model.attributes );
            var compiledTemplate = _.template( DocNotFoundTemplate, this.model.attributes );
            this.$el.html( compiledTemplate );
            App.EventBus.trigger( "page:rendered", {view: self}, this );
            this.$el.hammer();
            return this;
        },

        defaultErrorHandler: function( model, error ) {
            console.log( 'status', error.status );
            var self = this;
            var compiledTemplate = _.template( DocNotFoundTemplate, this.model.attributes );
            this.$el.html( compiledTemplate );
            App.EventBus.trigger( "page:rendered", {view: self}, this );
            return this;
        }

    });
    return DocumentView;
});