var Restify = require('restify');
var Router = require('restify-router').Router;

var server = Restify.createServer({
    name: 'Generic',
    version: '1.0.0'
});

server.use(Restify.acceptParser(server.acceptable));
server.use(Restify.queryParser());
server.use(Restify.bodyParser());

// Routes
require('./api/routes/UserRoutes').router.applyRoutes(server, '/api/:version/user');
require('./api/routes/TestRoutes').router.applyRoutes(server, '/api/:version/test');

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});