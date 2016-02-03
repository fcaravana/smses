/**
 * Load node modules.
 */
var winston = require('winston');

/**
 * Helpers module.
 */
var helpersCtrl = function (config) {

    /**
     * Self, for public properties and methods.
     */
    var self = {};

    self.logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({level: 'error'}),
            new (winston.transports.File)({
                maxsize: 10000000,
                maxFiles: 10,
                filename: config.root + '/' + (config.log_file ? config.log_file : 'server/shared/logs/app.log'),
                timestamp: true,
                level: (config.log_level ? config.log_level : 'debug')
            })
        ]
    });
    
    /**
     * Private properties and methods, start with _{name}.
     */
    var _config = config;

    /**
     * Log to file and print to console.
     * 
     * @param {object} data data to log
     * @param {boolean} save true or false
     * @param {string} type log type, info or error
     * @returns {undefined}
     */
    self.log = function (data, save, type) {

        if (_config.debug === true) {
            console.log(data);
        }
        
        if (save === true) {
            var message = (typeof data === 'object' ? JSON.stringify(data) : data);
            self.logger.log(type, message);
        }

    };

    return self;

};

module.exports = helpersCtrl;