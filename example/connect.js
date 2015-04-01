var connect = require('connect');
var httpProxy = require('http-proxy');
var proxyAuth = require('../');

var app = connect();
var proxy = httpProxy.createServer();

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    console.log('current user: ' + JSON.stringify(req.user));
});

app.use(proxyAuth.basic(
    { realm: "test" }, function (username, password, callback) {
        console.log("username: " + username);
        console.log("password: " + password);

        if (username === 'alice') callback({id: 'foo'});
        else callback();
    })
);

app.use(function (req, res) {
    // Stand alone HTTP Proxy
    proxy.web(req, res, { target: { host: req.headers.host, port: req.headers.port }});
});

app.listen(9090);
