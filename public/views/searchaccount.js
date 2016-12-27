issueTrackerApp.registerCtrl('searchaccountcontroller',
 function searchaccountcontroller($scope, $rootScope, $http, $location, appServices, $cookies,validationService) {
    $scope.PageHeader="Search Account";
    $scope.User={};
    $scope.Search='';

    $scope.searchAccount=function(inputSearch){
         appServices.doActionGet({ Token: $rootScope.token, Obj: '' }, 'searchAccount/' + inputSearch)
           .then(function (d) {
              console.log('d is '+ JSON.stringify(d));
              $scope.User=d.hits.hits;
           })
           .catch(function(err){
             $scope.User={};
           })
    }
    
    $scope.$watch('Search', function (newValue, oldValue, scope) {
       if(newValue!=oldValue){
         $scope.searchAccount($scope.Search);
       }
    });
     
 }); 
