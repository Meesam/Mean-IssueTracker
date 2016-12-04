(function () {
	'use strict';

let express=require('express');
let elasticSearch=require('../controllers/elasticSearchmodule/elasticSearch');
let logger=require('../core/Logger');

let apiRoutes = express.Router();

/* GET Name */
apiRoutes.get('/searchAccount/:input', function (req, res, next) {  
  console.log('input is ' + req.params.input);
  elasticSearch.getSuggestions(req.params.input)
    .then(function(data){
    	console.log(data);
    	logger.debug('request ' + req.path + ' takes ',data.took + ' ms');
    	res.json(data);
    })
    .fail(function(err){
    	next(err);
    })
    .done();
});
    

module.exports = apiRoutes;

})();