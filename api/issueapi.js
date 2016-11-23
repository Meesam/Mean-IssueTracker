(function () {
  'use strict';

  let express=require('express');
  let issues=require('../controllers/issuemodule/issues');
  let apiRoutes = express.Router();

  apiRoutes.get('/issues',function(req,resp,next) {
    issues.getAllissues(function(data,err){
	  if(err) {
		 return next(err);
	  }
	  else {
		  resp.json(data);
	  }
    });
  });

  apiRoutes.post('/issues',function(req,resp,next) {
	 issues.addIssue(req.body,function(data,err) {
	   if(err) {
		  return next(err);
	   }
	   else {
		  resp.json(data);
	   }
 });
  });

  module.exports = apiRoutes;
})();