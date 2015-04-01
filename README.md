## http-proxy-auth

**http-proxy-auth** is a [Connect/Express][] middleware for proxy authentication, authenticated user info is stored in `req.user`

[Connect/Express]: https://github.com/senchalabs/connect

[![Build Status](https://travis-ci.org/cybertk/http-proxy-auth.svg?branch=master)](https://travis-ci.org/cybertk/http-proxy-auth)
[![Dependency Status](https://david-dm.org/cybertk/http-proxy-auth.svg)](https://david-dm.org/cybertk/http-proxy-auth)
[![devDependency Status](https://david-dm.org/cybertk/http-proxy-auth/dev-status.svg)](https://david-dm.org/cybertk/http-proxy-auth#info=devDependencies)
[![Coverage Status](https://img.shields.io/coveralls/cybertk/http-proxy-auth.svg)](https://coveralls.io/r/cybertk/http-proxy-auth)


## Installation

[Node.js][] and [NPM][] is required.

    $ npm install http-proxy-auth

[Node.js]: https://npmjs.org/
[NPM]: https://npmjs.org/

## Usage

### Connect/Express and [node-http-proxy][] integration

[node-http-proxy]: https://github.com/nodejitsu/node-http-proxy

```
var connect = require('connect');
var httpProxy = require('http-proxy');
var proxyAuth = require('http-proxy-auth');

var app = connect();
var proxy = httpProxy.createServer();

app.use(proxyAuth.basic(
    { realm: "test" }, function (username, password, callback) {
        callback(username === 'alice');
    })
);

app.use(function (req, res) {
    // Stand alone HTTP Proxy
    proxy.web(req, res, { target: { host: req.headers.host, port: req.headers.port }});
});

app.listen(9090);
```


## Run Tests

    $ npm test

## Contribution

Any contribution is more than welcome!
