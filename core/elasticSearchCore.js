 (function(){
  'use strict';
  let elasticsearch=require('elasticsearch');

  let elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info'
  });

  let indexName='issuetracker';
  
 exports.elasticClient=elasticClient;

}());