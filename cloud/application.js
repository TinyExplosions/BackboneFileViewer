// Main Start point into the app
var webapp = require('fh-webapp');
var express = require('express');
$fh = require('fh-api');
var mainjs = require('main.js');

var app = express();

// CORS middleware
//
// This Allows `FHC Local` to work, as cloud is on port 8001
app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }
    res.header('Access-Control-Allow-Credentials', 'true');

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});


// Set up default routes so app can work as before
//
// (with Exported functions in main.js used with `$fh.act`)
app.use('/sys', webapp.sys(mainjs));
app.use('/mbaas', webapp.mbaas);
app.use('/cloud', webapp.cloud(mainjs));


// this will set up a series of routes under `/users`
//
// This is the REST wrapper for the FH Api
require('./documents').routes( app );

module.exports = app.listen(process.env.FH_PORT || process.env.VCAP_APP_PORT || 8001);















