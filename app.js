var Restify = require('restify');
var Router = require('restify-router').Router;
var passport = require('./api/services/PassportService');

var server = Restify.createServer({
    name: 'Generic',
    version: '1.0.0'
});

server.use(Restify.acceptParser(server.acceptable));
server.use(Restify.queryParser());
server.use(Restify.bodyParser());
server.use(passport.initialize());
// server.use(passport.authenticate('bearer', { session: false }));

// Routes
require('./api/controllers/UserController').router.applyRoutes(server, '/api/:version/user');
require('./api/controllers/TestController').router.applyRoutes(server, '/api/:version/test');

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});