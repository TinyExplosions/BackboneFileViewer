define([
    'underscore',
    'backbone',
    'utils',
    'models/document/DocumentModel'
], function( _, Backbone, Utils, DocumentModel ) {

    var DocumentCollection = Backbone.Collection.extend({
        model: DocumentModel,
        localStorage: new Backbone.LocalStorage("LocalDocumentCollection"),
        initialize: function() {
			this.fetch();
        }
    });

    return DocumentCollection;
});


