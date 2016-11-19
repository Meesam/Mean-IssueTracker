(function () {
  'use strict';

/*
 * Created by root on 1/11/16.
 */
let mongoose = require( 'mongoose' );

let UserDetailSchema=new mongoose.Schema({
  Name:{type:String,required:true},
  Email:[String],
  Address:[String]
});
module.exports = mongoose.model('UsersDetails',UserDetailSchema);
})();