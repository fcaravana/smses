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
     * List mobile messages between two numbers.
     * 
     * @returns {undefined}
     */
    self.listMessages = function (from, to) {

        _helpers.log("twilio-ctrl.js > self.listMessages", false);

        _listFilteredMessages({from: from, to: to}).then(function (messagesFromTo) {
            _listFilteredMessages({from: to, to: from}).then(function (messagesToFrom) {
                var messages = _.union(messagesFromTo, messagesToFrom);

                messages = _(messages).sortBy(function (message) {
                    return message.date_updated;
                });

                _res.render('components/smses/messages', {messages: JSON.stringify(messages)});
            });
        });

    };

    /**
     * List mobile messages filtered by from and to.
     * 
     * @returns {promise} resolve returns json messages data, reject returns error data
     */
    var _listFilteredMessages = function (options) {

        return new Promise(function (resolve, reject) {

            _twilio.messages.list(options, function (err, data) {

                if (!err) {
                    resolve(data.messages);
                } else {
                    reject(err);
                }
            });

        });

    };

    return self;

};

module.exports = twilioCtrl;