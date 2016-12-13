(function () {
	'use strict';

let express=require('express');
let status=require('../controllers/issuemodule/status');
let apiRoutes = express.Router();

apiRoutes.get('/status',function(req,resp,next){
	status.getAllStatus(function(data,err){
		if(err) {
			return next(err);
		}
		else {
			resp.json(data);
		}
	});
});

apiRoutes.get('/status/:statusid',function(req,resp,next){
	status.getStatusById(req.params.statusid,function(data,err){
		if(err) {
			return next(err);
		}
		else {
			resp.json(data);
		}
	});
});

apiRoutes.post('/status',function(req,resp,next){
	status.addStatus(req.body,function(data,err){
		if(err) {
			return next(err);
		}
		else {
			resp.json(data);
		}
	});
});

module.exports=apiRoutes;
})();