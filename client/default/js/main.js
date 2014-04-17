// Require.js allows us to configure shortcut alias
require.config({
    paths: {
        jquery: 'libs/jquery/jquery',
        backbone: 'libs/backbone/backbone',
        underscore: 'libs/underscore/underscore',
        machina: 'libs/machina/machina',
        templates: '../templates',
        jqueryCookie  : 'libs/jquery/jquery.cookie',
        hammer: 'libs/hammer/jquery.hammer.min'
    },
    shim: {
        'backbone': {
            deps: [ 'underscore', 'jquery' ],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        jqueryCookie: {
            deps: [ 'jquery' ]
        }
    }
});

require([
     // Load our app module and pass it to our definition function
    'app', 'jqueryCookie'
], function( App ){
    // The "app" dependency is passed in as "App"
    // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
    window.App = App;
    $fh.init({
        host: '<FH HOST>',
        appid: "<APP ID>",
        appkey: "<APP KEY>",
        mode: "live"
    }, function() {
        App.initialize();
    }, function(err,msg) {
        //Error handeling??
        console.log("init FAILED");
        console.log(err,msg);
        App.initialize();
    });
});
