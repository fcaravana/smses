/**
 * Load node modules.
 */
if (!global.Promise) {
    global.Promise = require('bluebird');
}

/**
 * Class for send sms's.
 *
 * @class facebook
 * @author Francisco Caravana (fcaravana@edigma.com)
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

        self.show();
    };

    /**
     * Show HTML
     * 
     * @returns {undefined}
     */
    self.show = function () {
        _helpers.log("app-ctrl.js > self.show", false);

        _res.render('components/smses/sms-list', {});
    };

    return self;

};

module.exports = appCtrl;