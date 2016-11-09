/**
 * Created by root on 1/11/16.
 */
var mongoose = require( 'mongoose' );

var UserDetailSchema=new mongoose.Schema({
  Name:{type:String,required:true},
  Email:[String],
  Address:[String]
});
module.exports = mongoose.model('UsersDetails',UserDetailSchema);