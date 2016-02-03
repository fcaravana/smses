/**
 * Load node modules.
 */
var ini = require('ini'),
        fs = require('fs'),
        express = require('express'),
        swig = require('swig');

/**
 * Load configurations.
 */
var config = ini.parse(fs.readFileSync(__dirname + '/server/shared/config/config.ini', 'utf-8'));
config.root = (config.root !== 'default' ? config.root : __dirname + '/');

/**
 * Load custom modules.
 */
helpersCtrl = new require(__dirname + '/server/shared/helpers/helpers-ctrl.js')(config);

/**
 * Set application scope.
 */
var scope = {};
scope.config = config;
scope.helpers = helpersCtrl;

/**
 * Load express framework.
 */
var app = express();

/**
 * Set swig template.
 */
app.engine('swig.html', swig.renderFile);
app.set('view engine', 'swig.html');
app.set('views', config.root + '/client');
app.set('view cache', false);
swig.setDefaults({cache: false});

/**
 * Express middleware cross origin.
 */
require(__dirname + '/server/shared/cors/cors.js');

/**
 * Routes.
 */
require(__dirname + '/server/shared/routes/routes.js')(app, scope);

/**
 * Static routes.
 */
app.use('/app', express.static(config.root + 'client'));

/**
 * Server.
 */
var server = app.listen(config.http.port, config.http.server, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});