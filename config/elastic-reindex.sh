#!/bin/sh
INDEX=${1:-issuetracker}

cd core
curl -XDELETE http://localhost:9200/${INDEX}
curl -f -X PUT http://localhost:9200/${INDEX} -d @account/issuetracker_analysis.json
curl -f -X PUT http://localhost:9200/${INDEX}/account/_mapping -d @account/account_mapping.json
curl -XPUT localhost:9200/${INDEX}/account/_bulk --data-binary "@account/accounts.json"


echo true
