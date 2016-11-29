(function () {
	'use strict';

let appconfig=require('../../appconfig');
let globalobj=require('../../core/global');
let util=require('util');
let mongoose=require('mongoose');
let Projects = mongoose.model('Projects');
let Q=require('q');

exports.getAllProject=function(aTableInfo,callback){
	let totalRecord=null;
	let perPage = aTableInfo.RPP
	 , page = Math.max(0, aTableInfo.CurPage);
	Projects.count({},function(err,data){
		if(err)
		totalRecord=0;
		else
			totalRecord=data;
	});

	Projects.find(function(err,data){
		if(err)
			callback(null,err);
		else {
		let	obj = {
				status: 'success',
		    	count:totalRecord,
			    data: data
			};
			callback(globalobj.globalObject(obj));
		}
	}).skip(perPage * (page-1)).limit(perPage).sort(aTableInfo.SortBy);
};

exports.addProject=function(projectdetails,callback){
  let project=new Projects(projectdetails);
	project.save(function(err){
		if(err)
		callback(null,err);
		else{
			let obj={
				status:'success',
				count:0,
				data:'Record add successfully'
			};
			callback(globalobj.globalObject(obj));
		}
	});
};

 exports.getProjectById=function(projectId) {
  return Q(Projects.find({_id:projectId}).exec())
		.then(function (data) {
			let obj = {
				status: 'success',
				count:data.length,
				data: data
			};
			return globalobj.globalObject(obj);
		})
		.catch(function (err) {
			console.log('error is ' + err);
		});
 };

})();


/*
exports.getAllPoject=function(callback){
	let sqlqury="select p.ProjectId,p.CreateDate,p.ProjectTitle,p.ProjectDescription,";
	sqlqury += "ISNULL(u.FirstName,'')+ ' ' + ISNULL(u.LastName, '')as CreatedBy from ProjectMaster p inner join Users u on p.CreateBy=u.UserId";
	db.runSql(sqlqury,function(data,err){
		if(err){
          callback(null,err);
		}
		else{
			let obj={
					status:'success',
					count:data.length,
					data:data
				}
				callback(globalobj.globalObject(obj));
		}
	});
}

exports.addProject=function(project,callback){
   if(project==null){
   	callback(null,err);
   }
   else{
   	console.log(project);
   	let sqlqury="Insert into ProjectMaster(ProjectTitle,ProjectDescription,CreateBy) Values ";
   	sqlqury +=util.format("('%s','%s',%d)",project.ProjectTitle,project.ProjectDescription,project.CreateBy);
   	console.log(sqlqury);
   	db.runSql(sqlqury,function(err,data){
         if(err)
         	return err;
         else{
         	let obj={
					status:'success',
					count:0,
					data:'Record add successfully'
				}
				callback(globalobj.globalObject(obj));
         }
   	});
   }
}

exports.getProjectById=function(projectid,callback){
	if(projectid==0)
		return callback(null,err);
	else{
		let sqlqury="Select * from ProjectMaster where Projectid=" + projectid;
		db.runSql(sqlqury,function(data,err){
			if(err)
				return err;
			else{
		        let obj={
					status:'success',
					count:data.length,
					data:data	
				}
				callback(globalobj.globalObject(obj));		
			}
		})
	}
}
*/

