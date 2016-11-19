(function () {
	'use strict';

let mssql=require('mssql');
let appconfig=require('../appconfig');
let mongoose=require('mongoose');
let Logger=require('./Logger');

// Build the connection string
let dbURI = appconfig.dbUrl;

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
	Logger.debug('Mongoose default connection open to ' , dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
	Logger.debug('Mongoose default connection error :' , err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
	Logger.debug('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
	mongoose.connection.close(function () {
		Logger.debug('Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});

require('../models/userModel');
require('../models/appMenuModel');
require('../models/projectModel');
require('../models/userDetailModel');
})();


/* This method will work with Sql Server
exports.runSql=function(sqlqury,callback) {
	let conn=new mssql.Connection(appconfig.dbconfig);
	conn.connect(function(err){
		if(err){
           callback(null,err);
		}
		let sqlrequest=new mssql.Request(conn);
		sqlrequest.query(sqlqury,function(err,recordset){
             if(err){
                callback(null,err);  	
             }
             else{
             	callback(recordset);  	
             }
		});

	});
}*/

