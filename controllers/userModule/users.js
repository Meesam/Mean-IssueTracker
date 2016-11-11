// Open db comment when use sql server
//var db=require('../../core/db');
var appconfig=require('../../appconfig');
var globalobj=require('../../core/global');
var util=require('util');
var Q=require('q');
var mongoose=require('mongoose');
var Users = mongoose.model('Users');
var UsersDetails=mongoose.model('UsersDetails');

/*
var Schema=mongoose.Schema;
mongoose.connect(appconfig.dbUrl);
var db=mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
	console.log("Connection succeeded.");
});
*/



// Add User
exports.createUsers=function(users,callback){
  if(users){
	  console.log('User data is ' + JSON.stringify(users));
	  var user=new Users(users);
	   user.save(function(err,data){
	   if(err)
	    callback(null,err);
	   else {
		   var obj={
		   status:'success',
		   count:data.length,
		   data:data
	     }
		   callback(globalobj.globalObject(obj));
	   }
	 });
   }
};

// Login
exports.doLogin=function(users,callback){
	if(users != null){
	  Users.find({usersName:users.usersName,Password:users.Password},function(err,data){
		 if(err)
		  callback(null,err);
		  else{
			 console.log("data is " + data.length);
              if(data.length != 0) {
				  var obj={
					  status:'success',
					  count:data.length,
					  data:data,
					 // tokenvalue: data[0].Email
					  tokenvalue:'meesam.engineer@gmail.com'
				  }
			  }
			 else {
				  var obj = {
					  status: 'success',
					  count: 0,
					  data: null
				  }
			  };
			 callback(globalobj.globalObject(obj));
		 }
	  });
  }
};

// Save User Detalis
exports.addUserDetails=function (userDetails,callback) {
	for(var i=0;i < userDetails.length;i++){
		var userDetail=new UsersDetails({
			Name : userDetails[i].Name,
			Email: userDetails[i].Email,
			Address:userDetails[i].Address
		});
		userDetail.save(function(err){
			if(err)
				callback(null,err);
			else{
				var obj={
					status:'success',
					count:0,
					data:'Record add successfully'
				}
				callback(globalobj.globalObject(obj));
			}
		});
	}

}


// Get User by Email
exports.getUserByEmail=function(emailid,callback){
	if(emailid != null){
		Users.find({Email:emailid},function(err,data){
           if(err)
		    callback(null,err);
			else{
			   var obj={
				   status:'success',
				   count:data.length,
				   data:data
			   }
			   callback(globalobj.globalObject(obj));
		   }
		});
	}

};

// Get All Users
exports.getAllUsers=function(callback){
    Users.find({},function(err,data){
		if(err)
		 callback(null,err);
		else{
			var obj={
				status:'success',
				count:data.length,
				data:data
			}
			callback(globalobj.globalObject(obj));
		}
	});

};

