// Authentication module.
var http = require('http');
var connect = require('connect');
var httpProxy = require('http-proxy');
var auth = require('../');

var app = connect();
var proxy = httpProxy.createServer();

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    console.log('current user: ' + req.user);
});

app.use(auth.basic(
    { realm: "test" }, function (username, password, callback) {
        console.log("username: " + username);
        console.log("password: " + password);

        if (username === 'alice') callback('alice');
        else callback();
    })
);


app.use(function (req, res) {

    // You can define here your custom logic to handle the request
    // and then proxy the request.
    proxy.web(req, res, { target: { host: req.headers.host, port: req.headers.port }});
});

http.createServer(app).listen(1337);
