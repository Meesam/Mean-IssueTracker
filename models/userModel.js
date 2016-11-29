(function () {
    'use strict';

let mongoose = require( 'mongoose' );

// Create User Schema
let userSchema=new mongoose.Schema({
    FirstName:{type:String,required:true},
    MiddleName:String,
    LastName:{type:String,required:true},
    Gender:String,
    UserName:String,
    Password:String,
    EmailAddress:[{
        EmailId:String,
        IsPrimary:Boolean
    }],
    Contact:[{
       Mobile:String,
       Address:String,
       City:String,
       State:String,
       IsPermanant:Boolean
    }],
    Education:[{
       Name:String,
       University:String,
       Year:Number,
       EducationType:String
    }],
    DOB:Date,
    LastLogin:Date
});
module.exports = mongoose.model('Users',userSchema);
})();