(function () {
	'use strict';

let express=require('express');
let elasticSearch=require('../controllers/elasticSearchmodule/elasticSearch');

let apiRoutes = express.Router();

/* GET Name */
apiRoutes.get('/searchAccount/:input', function (req, res, next) {  
  console.log('input is ' + req.params.input);
  elasticSearch.getSuggestions(req.params.input)
    .then(function(data){
    	res.json(data);
    })
    .fail(function(err){
    	next(err);
    })
    .done();
});
    

module.exports = apiRoutes;

})();