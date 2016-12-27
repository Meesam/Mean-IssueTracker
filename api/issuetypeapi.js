(function () {
	'use strict';

  let express=require('express');
  let issuetype=require('../controllers/issuemodule/issuetype');
  let apiRoutes = express.Router();

  apiRoutes.get('/issuetype',function(req,resp,next){
   issuetype.getallIssuetype(function(data,err){
     if(err) {
	   return next(err);
	 }
     else {
	   resp.json(data);
	 }
   });
 });

  apiRoutes.get('/issuetype/:typeid',function(req,resp,next){
	issuetype.getIssuetypeById(req.params.typeid,function(data,err){
      if(err) {
		return next(err);
	  }
      else {
		resp.json(data);
	  }
	});
  });

  apiRoutes.post('/issuetype',function(req,resp,next){
	issuetype.addIssuetype(req.body,function(data,err){
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