var collectCredential = function (req, callback) {

    var header = req.headers["proxy-authorization"];
    if (!header) {
        return callback(null);
    }

    var res = header.split(" ");
    var type = res[0], hash = res[1]

    if (type !== 'Basic') {
        return callback(null);
    }
    var buf = (new Buffer(hash, 'base64')).toString('utf8').split(":");

    return callback({username: buf[0], password: buf[1]});

};

var challenge = function (realm, res) {
    // Sent realm
    var header = "Basic realm=\"" + realm + "\"";
    res.setHeader("Proxy-Authenticate", header);
    res.writeHead(407);
    res.end();
};

var proxyAuth = function (options, authenticate) {


    return function proxyAuth(req, res, next) {
        collectCredential(req, function (credential) {

            if (!credential) {
                    // Un-authenticated, sent 407
                    return challenge(options.realm, res);
            }

            authenticate(credential.username, credential.password, function (user) {

                if (!user) {
                    // Un-authenticated, sent 407
                    return challenge(options.realm, res);
                }

                req.user = user;
                next();

            });
        });
    };
};

module.exports.basic = proxyAuth;
