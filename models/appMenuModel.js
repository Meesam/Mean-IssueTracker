(function () {
    'use strict';

let mongoose = require( 'mongoose' );

let moduleSchema=new mongoose.Schema({
    MenuName:{type:String,required:true},
    MenuRoute:String
});
module.exports = mongoose.model('Modules',moduleSchema);
})();