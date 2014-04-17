// Filename: app.js
define([
    'jquery',
    'underscore',
    'backbone',
    'utils',
    'router',
    'connection/ConnectionManager',
    'connection/Stethoscope',
    'backbone.localstorage',
    'collections/documents/LocalDocumentCollection'
], function( $, _, Backbone, Utils, Router, ConnectionManager, Stethoscope, LocalStorage, LocalDocumentCollection ) {
    // create a new stethoscope
    var stethoscope = new Stethoscope();

    var initialize = function( options ){
        //if this is on device, get the fs ref
        if(typeof LocalFileSystem !== 'undefined') {
            function onFS(fs) {
                //leave in for now for debug
                // alert(fs.root.fullPath);
                App.filesystem = fs;
                App.fileroot = fs.root.toURL();
            }
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFS, null);
        }
        // create an `event` bus attached to the `App` object
        App.EventBus = new _.extend( {}, Backbone.Events );
        // create a new connection manager and attach it to the `App` object
        App.Connection = new ConnectionManager( { stethoscope: stethoscope } );
        // initialize anything we have in `Utils`
        Utils.initialize();
        // create a new Local Document Collection and preprime it from localStorage
        App.LocalDocCollection = new LocalDocumentCollection();
        // create the App's router
        App.router = new Router();
        // Listen for connection change events, and fire a `transition` event on the event bus
        App.Connection.on( "transition", function( data ) {
            App.EventBus.trigger( "connection:transition", data );
        });
        // Start up the `Router`, the App should be ready to go!
        Backbone.history.start();
        // Attempt to go online
        App.Connection.goOnline();
    };

    return {
        initialize: initialize
    };
});
