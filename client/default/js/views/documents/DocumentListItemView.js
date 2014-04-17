define([
    'underscore',
    'backbone',
    'hammer',
    'text!templates/documents/DocumentListItemTemplate.html',
    'models/document/DocumentModel'
], function( _, Backbone, Hammer, DocumentListItemTemplate, DocumentModel ){

    var DocumentListItemView = Backbone.View.extend({
        tagName: 'li',
        initialize: function( options ) {
            console.log("new doc view");
            _.bindAll( this, 'render' );
            this.model.bind( 'change', this.render );
        },

        events: {
            'click .download': 'downloadDocument',
            'click .deleteLocal': 'deleteLocalDocument',
            'click .doc': 'openDoc'
            // 'click a': 'click',
            // 'tap a': 'tap'
        },

        render: function() {
            console.log(new Date(this.model.get('timestamp')));
            var compiledTemplate = _.template( DocumentListItemTemplate, this.model.attributes );
            this.$el.html( compiledTemplate );
            this.$el.hammer();
            return this;
        },

        downloadDocument: function( evt ) {
            if(this.model.get("loading")) {
                return false;
            }
            this.model.set("loading",true);

            //if App.filesystem is available, we're on device so use it
            if(window.requestFileSystem) {
                window.requestFileSystem(
                    LocalFileSystem.PERSISTENT, 0,
                    function onFileSystemSuccess(fileSystem) {
                        fileSystem.root.getFile(
                            "dummy.pdf",
                            {create: true, exclusive: false},
                            function gotFileEntry(fileEntry){
                                var sPath = fileEntry.fullPath.replace("dummy.pdf","");
                                var fileTransfer = new FileTransfer();
                                fileEntry.remove();
                                var url = encodeURI(this.model.get("remotepath"));
                                fileTransfer.download(
                                    url,
                                    sPath+this.model.get("filename"),
                                    function(entry) {
                                        console.log("download complete: " + entry.fullPath);
                                        this.model.set("downloaded",true);
                                        this.model.set("loading",false);
                                        this.model.set("localpath",entry.fullPath);
                                        var md = new DocumentModel(this.model.attributes);
                                        App.LocalDocCollection.add(md);
                                        md.save();
                                    }.bind(this),
                                    function(error) {
                                        this.model.set("loading",false);
                                        alert("Error in Downloading file!");
                                        console.log("download error source " + error.source);
                                        console.log("download error target " + error.target);
                                        console.log("upload error code" + error.code);
                                    }.bind(this)
                                );
                            }.bind(this)
                        );
                    }.bind(this));
            } else {
                //possibly in browser so serve direct from cloud
                setTimeout(function() {
                    this.model.set("downloaded",true);
                    this.model.set("loading",false);
                    this.model.set("localpath",this.model.get("remotepath"));
                    var md = new DocumentModel(this.model.attributes);
                    App.LocalDocCollection.add(md);
                    md.save();
                }.bind(this), 4000);
            }
            return false;
        },

        deleteLocalDocument: function( evt ) {
            this.model.set("downloaded",false);
            // App.LocalDocCollection.remove(docID);
            if(App.LocalDocCollection.get(this.model.id)) {
                //remove doc from FS
                if(App.filesystem) {
                    function gotFileEntry(fileEntry) {
                        fileEntry.remove(function(){
                            try {
                                navigator.notification.alert(opts, function() {}, "FileView", "Custom");
                            } catch(err) {
                                alert("success");
                            }
                        }, function(){alert("fail")});
                    }
                    function fail() {
                        alert("can't get file");
                    }
                    App.filesystem.root.getFile(App.LocalDocCollection.get(this.model.id).get("localpath"), null, gotFileEntry, fail);

                }
                App.LocalDocCollection.get(this.model.id).destroy();
            }
            this.model.set("localpath","");
            return false;
        },

        openDoc: function( evt ) {
            if(this.model.get("updateAvailable")) {

                var r = confirm("An newer version of this document is available, do you want to download it?");
                if (r == true) {
                    console.log("UPDATE!");
                }
                else {
                    console.log("Open!");
                }
            } else {
                this.doOpen();
            }
            return false
        },

        doOpen: function() {
            if(this.model.get("localpath")) {
                var path;
                if(window.requestFileSystem) {
                   path = this.model.get("localpath")
                } else {
                    path = this.model.get("remotepath");
                }
                window.open(path, '_blank', 'location=yes,enableViewportScale=yes');
            } else {
                console.log("You Need to download this document");
                this.downloadDocument();
            }
            return false;
        }

    });
    return DocumentListItemView;
});