(function () {
    'use strict';

/**
 * Created by root on 11/11/16.
 */
const winston=require('winston');
winston.emitErrs = true;
const logDir = 'logs';
const env = process.env.NODE_ENV || 'localdev';

const tsFormat =new Date().toLocaleTimeString();

const logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        new (winston.transports.File)({
            filename: 'logs/IssueTrackerlogs.log',
            timestamp: tsFormat,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            level: env === 'localdev' ? 'debug' : 'info'
        })
    ],
    exitOnError: false
});
module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
})();
