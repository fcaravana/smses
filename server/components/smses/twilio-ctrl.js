/**
 * Load node modules.
 */
if (!global.Promise) {
    global.Promise = require('bluebird');
}

var _ = require('underscore');

/**
 * Class for comunicate with twilio.
 *
 * @class twilioCtrl
 * @author Francisco Caravana (fcaravana@gmail.com)
 * @constructor
 */
var twilioCtrl = function () {

    /**
     * Self, for public properties and methods.
     */
    var self = {};

    /**
     * Private properties and methods, start with _{name}.
     */
    var _req = null;
    var _res = null;

    var _config = null;
    var _helpers = null;
    var _twilio = null;

    /**
     * Start, sets response and request and app scope.
     * 
     * @param {object} req request
     * @param {object} res response
     * @param {object} scope application scope
     * @returns {undefined} undefined
     */
    self.start = function (req, res, scope) {

        scope.helpers.log("twilio-ctrl.js > self.start", false);

        _req = req;
        _res = res;

        _config = scope.config;
        _helpers = scope.helpers;
        _twilio = scope.twilio;

    };

    /**
     * List mobile messages.
     * 
     * @returns {undefined}
     */
    self.listMessages = function (from, to) {

        _helpers.log("twilio-ctrl.js > self.listMessages", false);

        var options = {};
        
        if (from && to) {
            options = {from: from, to: to};
        }
        
        _twilio.messages.list(options, function (err, data) {

            if (!err) {
                console.log(data);

                data.messages.forEach(function (message) {
                    console.log(message.friendlyName);
                });

                _res.render('components/smses/messages', {json: JSON.stringify(data.messages)});
            }
        });

    };

    return self;

};

module.exports = twilioCtrl;