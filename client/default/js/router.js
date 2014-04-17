// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/header/HeaderView',
    'views/main/MainView',
    'views/documents/DocumentView',
    'views/documents/DocumentCollectionView',
    'collections/documents/DocumentCollection',
    'collections/documents/LocalDocumentCollection',
    'utils'
], function( $, _, Backbone, HeaderView, MainView, DocumentView, DocumentCollectionView, DocumentCollection, LocalDocumentCollection, Utils ) {

    var Router = Backbone.Router.extend({
        routes: {
            "docs/:docid": "docRoute",
            "local": "localDocsRoute",
            "remote": "defaultRoute",
            "*actions": "defaultRoute"
        },

        initialize: function( options ) {
            this.appView = new Utils.appView();
            App.headerView = new HeaderView();
            App.DocCollection = new DocumentCollection();
            App.LocalDocCollection = new LocalDocumentCollection();
            App.DocCollection.fetch({success: function(){
                Utils.mergeLists();
            }});
        },

        defaultRoute: function( actions ) {
            // new MainView();
            console.log("Get collection");
            var docListView = new DocumentCollectionView({collection: App.DocCollection, title: 'Remote Documents',selectedTab:'remoteDocs'});
            this.appView.showView(docListView);
            // docListView.collection.fetch();
        },

        localDocsRoute: function( actions ) {
            // new MainView();
            var docListView = new DocumentCollectionView({collection: App.LocalDocCollection, title: 'Local Documents',selectedTab:'localDocs'});
            docListView.collection.fetch({reset:true});
            this.appView.showView(docListView);
        },

        // userListRoute: function() {
        //     // always calling fetch on route is a bit shit, but will do for now
        //     new UserListView().collection.fetch({reset: true});
        // },

        docRoute: function(docid) {
            // var docModel = new DocumentModel( {id:docid} );
            new DocumentView( {docid:docid} ).model.fetch();
        }
    });

    return Router;
});