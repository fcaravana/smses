/**
 * Load node modules.
 */
if (!global.Promise) {
    global.Promise = require('bluebird');
}
var _ = require('underscore');

/**
 * Class comunicate with twilio module.
 *
 * @class twilioCtrl module
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
     * Send sms message.
     * 
     * @param {string} from from mail
     * @param {string} to to mail
     * @param {string} message sms message
     * @returns {undefined}
     */
    self.sendMessage = function (from, to, message) {

        _twilio.sendMessage({
            to: (to ? to : _config.twilio.mobile),
            from: (from ? from : _config.twilio.number),
            body: message

        }, function (err, responseData) {

            var json = null;

            if (!err) {
                json = JSON.stringify({
                    status: "success",
                    data: responseData,
                    message: "Message sent."
                });
                
                _helpers.log('Message sent: ' + message, true, 'info');
            } else {
                json = JSON.stringify({
                    status: "error",
                    data: err,
                    message: "Twilio api error."
                });
                
                _helpers.log(err, true, 'error');
            }

            _res.render('components/mobilemessages/messages-json', {messages: json});
        });

    };

    /**
     * List mobile messages between two numbers.
     * 
     * @param {string} number1 twilio phone number
     * @param {string} number2 mobile phone number
     * @returns {undefined}
     */
    self.listMessages = function (number1, number2) {

        _helpers.log("twilio-ctrl.js > self.listMessages", false);

        _listFilteredMessages({from: number1, to: number2}).then(function (messagesFromTo) {

            _listFilteredMessages({from: number2, to: number1}).then(function (messagesToFrom) {
                var messages = _.union(messagesFromTo, messagesToFrom);

                messages.sort(function (a, b) {
                    var c = new Date(a.date_updated);
                    var d = new Date(b.date_updated);
                    return c - d;
                });

                messages = _.reject(messages, function (message) {
                    return message.body.indexOf('Reply HELP for help.Reply STOP to unsubscribe.') >= 0;
                });

                var json = JSON.stringify({
                    status: "success",
                    data: messages,
                    message: ""
                });

                _res.render('components/mobilemessages/messages-json', {messages: json});
            }).catch(function (err) {
                _helpers.log(err, true, 'error');
            });

        }).catch(function (err) {
            _helpers.log(err, true, 'error');
        });

    };

    /**
     * List mobile messages filtered by from and to.
     * 
     * @param {object} options filters
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