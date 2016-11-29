(function () {
	'use strict';

let express=require('express');
let db=require('../core/db');
let projects=require('../controllers/projectmodule/projects');
let apiRoutes = express.Router();
let Q=require('q');


// Get all project list
apiRoutes.post('/project',function (req,resp,next) {
	projects.getAllProject(req.body,function(data,err){
		if(err) {
			return next(err);
		}
		else {
			resp.json(data);
		}
	});
});

/*
apiRoutes.get('/projects/:projectId',function(req,resp,next){
	projects.getProjectById(req.params.projectId,function(data,err){
		if(err) {
			return next(err);
		}
		else{
			resp.json(data);
		}
	});
});
*/

	apiRoutes.get('/projects/:projectId',function(req,resp,next){
	  projects.getProjectById(req.params.projectId)
		.then(function (data) {
		   resp.json(data);
		})
		.catch(function (err) {
		   next(err);
		})
		.done();
	});

	apiRoutes.post('/projects/add',function(req,resp,next){
		projects.addProject(req.body.Obj,function(data,err){
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