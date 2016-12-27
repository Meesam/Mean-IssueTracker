(function () {
    'use strict';

let express=require('express');
let db=require('../core/db');
let usersModule=require('../controllers/userModule/users');
let apiRoutes = express.Router();
let Logger=require('../core/Logger');

apiRoutes.post('/login',function(req,resp,next){
    let users=req.body;
	if(users){
       usersModule.doLogin(users,function(data,err){
           if(err){
           	  return next(err);
           }
           else{
              if(data.Status=='loginfail')
              	return next(new Error('Login Fail'));
               resp.json(data);
           }
       });
	}
});


apiRoutes.get('/userfromtoken',function(req,resp,next){
  let token =req.cookies;
  if(token.UserToken){
     usersModule.getUserByEmail(token.UserToken,function(data,err){
       if(err)
         return next(err);
       else{
        resp.json(data);
      }
     });
  }
});

apiRoutes.post('/userDetails',function (req,resp,next) {
   console.log(req.body.Obj);
    usersModule.addUserDetails(req.body.Obj,function(data,err){
     if(err) return next(err);
     else resp.json(data);
    });
});

apiRoutes.post('/user/add',function (req,resp,next) {
  usersModule.createUsers(req.body.Obj,function(data,err){
      if(err) return next(err);
      else resp.json(data);
  });
});

module.exports = apiRoutes;
})();