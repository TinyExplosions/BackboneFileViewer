define([
    'underscore',
    'backbone',
    'utils'
], function( _, Backbone, Utils ) {

    var DocumentModel = Backbone.Model.extend({
        // Default values.
        defaults : {
            docname: "",
            remotepath: "",
            localpath: "",
            thumbnail: "",
            downloaded: false,
            loading: false,
            updateAvailable: false
        },
        initialize : function(options) {
            this.urlRoot = Utils.getRoot()+"/docs";
        }
    });

    return DocumentModel;
});


