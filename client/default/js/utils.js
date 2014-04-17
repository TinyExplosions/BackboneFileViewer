// Filename: utils.js
define([
    'jquery',
    'backbone'
], function( $,Backbone ){

    var _transition = function(data) {
        console.log( "Transitioning", data );
    };

    var initialize = function(options){
        console.log( "Utils Init" );
        // overRiding ajax settings to include cookie info
        $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
            options.xhrFields = {
                withCredentials: true
            };
        });
        // Bind to the `transition` event to handle Connection Changes
        App.EventBus.bind( "connection:transition", _transition, this );

        Backbone.View.prototype.close = function(){
            this.remove();
            this.unbind();
            if (this.onClose){
                this.onClose();
            }
        };

        var fail = failCB('requestFileSystem');
        // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    };


    var getRoot = function() {
        // figure out the root for calls to the REST API (instead of using $fh.act)
        var cloud_host = $fh.cloud_props.hosts.releaseCloudUrl;
        if ( $fh.app_props.mode && $fh.app_props.mode.indexOf("dev") > -1 ) {
            cloud_host = $fh.cloud_props.hosts.debugCloudUrl;
        }
        return cloud_host;
    };


    var file = {
        writer: { available: false },
        reader: { available: false }
    };
    var dbEntries = [];


    var failCB = function (msg) {
        return function () {
            alert('[FAIL] ' + msg);
        }
    };

    function gotFS(fs) {
        // placeholder success callback
        console.log("Success from the filesystem!");
    };

    var appView = function() {
        this.showView = function( view ) {
            if (this.currentView){
                this.currentView.close();
            }
            this.currentView = view;
            this.currentView.render();
            $(".content").html(this.currentView.el);
        };
    };

    var mergeRemoteLocalDocLists = function() {
        // go through the local list of docs, and if the remote collection contains the same one, mark it downloaded
        // localCollection will always be smaller or same size as remote collection
        for (var i = 0; i < App.LocalDocCollection.models.length; i++) {
            var updateAvailable = false
            var localModel = App.LocalDocCollection.models[i];
            var localTimestamp = localModel.get("timestamp");
            if(App.DocCollection.get(localModel.get("id"))) {
                var model = App.DocCollection.get(localModel.get("id"));
                var timestamp = model.get("timestamp");
                if(timestamp > localTimestamp) {
                    //doc is newer on server so update models
                    updateAvailable = true;
                    localModel.set({updateAvailable:updateAvailable});
                }
                model.set({downloaded:true,localpath:localModel.get("localpath"),updateAvailable:updateAvailable});

            }
        }
    };

    return {
        initialize: initialize,
        getRoot: getRoot,
        file: file,
        dbEntries: dbEntries,
        mergeLists: mergeRemoteLocalDocLists,
        appView: appView
    };
});
