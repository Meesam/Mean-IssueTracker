(function () {
    'use strict';

let redis= require('redis');
let redisClient=redis.createClient();
let util = require('util');
let logger=require('./Logger');

redisClient.on('error',function(err){
    logger.debug('Redis error is ' , err);
});

redisClient.on('connect',function(){
    logger.debug('Redis server is connect now.');
});

redisClient.monitor(function (err, res) {
    logger.debug('Entering monitoring mode.');
});

redisClient.on('monitor', function (time, args, rawReply) {
    logger.debug(time + ': ' +  util.inspect(args)); // 1458910076.446514:['set', 'foo', 'bar']
});


module.exports=redisClient;
})();



/*
redisClient.get("city",function(err,data){
 if(err)
 console.log('Error is ' + err);
 else console.log('Result is ' + data);
 })*/

/*redisClient.setex('Office',60,'Compunnel')*/
