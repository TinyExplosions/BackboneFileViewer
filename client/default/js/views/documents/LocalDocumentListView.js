define([
    'underscore',
    'backbone',
    'hammer',
    'text!templates/documents/DocumentListTemplate.html',
    'collections/documents/LocalDocumentCollection'
], function(  _, Backbone, Hammer, DocumentListTemplate, LocalDocumentCollection ){

    var DocumentListView = Backbone.View.extend({
        el: $( ".content" ),

        initialize: function( options ) {
            var self = this;
            this.collection = new LocalDocumentCollection();
            _.bindAll( this, "renderList" );
            this.collection.bind( "reset", this.renderList );
        },

        events: {
            'swipe': 'swipeleft',
            // 'click a': 'click',
            // 'tap a': 'tap'
        },

        renderList: function() {
            console.log( "rendering collection" );
            App.HeaderModel.set( "title","Documents" );
            var self = this;
            var compiledTemplate = _.template( DocumentListTemplate, {docs: this.collection.models} );
            this.$el.html( compiledTemplate );
            App.EventBus.trigger( "page:rendered",{view: self}, this );
            $("li").removeClass("active");
            $("li.localDocs").addClass("active");
            this.$el.hammer();
            return this;
        },

        swipeleft: function( evt ) {
            console.log( "Swiped Left",evt.target );
            alert( "Swiped Left" );
        },

        click: function() {
            return false;
        },

        tap: function( evt ) {
            console.log( "tappit",evt.target );
        }

    });
    return DocumentListView;
});