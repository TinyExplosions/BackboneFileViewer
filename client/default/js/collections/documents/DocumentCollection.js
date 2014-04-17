define([
    'underscore',
    'backbone',
    'utils',
    'models/document/DocumentModel'
], function( _, Backbone, Utils, DocumentModel ) {

    var DocumentCollection = Backbone.Collection.extend({
        model: DocumentModel,
        initialize : function(options) {
            this.url = Utils.getRoot()+"/docs";
        }
    });

    return DocumentCollection;
});