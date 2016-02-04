/**
 * Load node modules.
 */
if (!global.Promise) {
    global.Promise = require('bluebird');
}

/**
 * Class to control the app interface for sending mobile messages.
 *
 * @class appCtrl
 * @author Francisco Caravana (fcaravana@gmail.com)
 * @constructor
 */
var appCtrl = function () {

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

    /**
     * Start, sets response and request and app scope.
     * 
     * @param {object} req request
     * @param {object} res response
     * @param {object} scope application scope
     * @returns {undefined} undefined
     */
    self.start = function (req, res, scope) {

        scope.helpers.log("app-ctrl.js > self.start", false);

        _req = req;
        _res = res;

        _config = scope.config;
        _helpers = scope.helpers;

    };

    /**
     * print html to browser.
     * 
     * @returns {undefined}
     */
    self.print = function () {

        _helpers.log("app-ctrl.js > self.print", false);

        _res.render('components/smses/sms-list', {});

    };

    return self;

};

module.exports = appCtrl;