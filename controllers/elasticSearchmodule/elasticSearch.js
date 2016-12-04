(function(){
  'use strict';
  let elasticSearchCore=require('../../core/elasticSearchCore');
  let Q=require('q');

  let indexName = "issuetracker";

  function getSuggestions(input) {
    return Q(elasticSearchCore.elasticClient.search({
        index: indexName,
        type: "account",
        body: {
            _all:input
        }
    }))
    .catch(function(err){
       console.log('Error is ' + err)
    });
  }

 exports.getSuggestions=getSuggestions;

}());