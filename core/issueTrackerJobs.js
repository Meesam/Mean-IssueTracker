(function(){
  'use strict';

  let cron=require('node-cron');
  let logger=require('./Logger');
  // cron jobs
  var task = cron.schedule('*/2 * * * * *', function() {
    logger.info('immediately started');
  }, false);
 
task.start();
})();
 