(function () {
	'use strict'

let globalobj=require('../../core/global');
let util=require('util');
let appconfig=require('../../appconfig');
let mongoose=require('mongoose');
let Modules = mongoose.model('Modules');

// Add Module
exports.addModules=function(modules,callback){
     if(modules != null){
		 let md=new Modules({
			 MenuName:modules.MenuName,
			 MenuRoute:modules.RoutName
		 });
		 md.save(function(err){
			 if(err)
			 callback(null,err);
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

};

// Get All Modules
exports.getAllModules=function(callback){
			Modules.find(function(err,data){
				if(err)
					callback(null,err);
				else{
					let obj={
						status:'success',
						count:data.length,
						data:data
					}
					callback(globalobj.globalObject(obj));
				}
			});
		};


/*
exports.getAllModules=function(callback){
	db.runSql('Select * from Modules',function(data,err){
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
};

exports.getMenubyId=function(moduleId,callback){
   let query='select mm.MenuId, m.MenuName,m.Route from ModuleMenu mm' ;
     query += ' inner join Menus m on m.MenuId=mm.MenuId inner join Modules mo on mo.ModuleId=mm.ModuleId where mo.ModuleId=' + moduleId; 
	 
   db.runSql(query,function(data,err){
   	  if(err){
   	  	callback(null,err);
   	  }
   	  else{
   	  	let obj={
   	  		status:'success',
			count:data.length,
			data:data
   	  	};
   	  	callback(globalobj.globalObject(obj));
   	  }
   });
};
*/

})();