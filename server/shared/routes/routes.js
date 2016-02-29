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
    
    app.post('/twilio/sendmessage', function (req, res) {
        twilioController = new twilioCtrl();
        twilioController.start(req, res, scope);
        twilioController.sendMessage(req.query.number1, req.query.number2, req.query.message);
    });
    
    app.get('/twilio/messages', function (req, res) {
        twilioController = new twilioCtrl();
        twilioController.start(req, res, scope);
        twilioController.listMessages(req.query.number1, req.query.number2);
    });

};

module.exports = routes;