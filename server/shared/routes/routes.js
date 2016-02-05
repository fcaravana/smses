/**
 * Load node modules.
 */
var _ = require('underscore');

/**
 * Load custom modules.
 */
var twilioCtrl = require(__dirname + '/../../components/mobilemessages/twilio-ctrl');
var appCtrl = require(__dirname + '/../../components/mobilemessages/app-ctrl');

/**
 * Express routes.
 * 
 * @param {type} app app
 * @param {type} scope scope
 * @returns {undefined}
 */
var routes = function (app, scope) {

    /**
     * Start up.
     */
    app.listen(scope.config.http.port, function () {
        scope.helpers.log("routes.js > listen", false);
    });

    /**
     * Routes.
     */
    app.get('/', function (req, res) {
        res.redirect('/app/messages');
    });

    app.get('/app/messages', function (req, res) {
        appController = new appCtrl();
        appController.start(req, res, scope);
        appController.print();
    });
    
    app.get('/twilio/messages/:number1/:number2', function (req, res) {
        twilioController = new twilioCtrl();
        twilioController.start(req, res, scope);
        twilioController.listMessages(req.params.number1, req.params.number2);
    });

};

module.exports = routes;