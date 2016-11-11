issueTrackerApp.registerCtrl('userprofilecontroller',function userprofilecontroller($scope, $rootScope, $http, $location, appServices, $cookies,validationService) {
      $scope.PageHeader = "Add User Details";
      $scope.IsNew=true;
      $scope.user={};
     $scope.user.EmailAddress=[];

      $scope.SaveUser=function () {
          if ( angular.isUndefined($scope.user.FirstName) || $scope.user.FirstName == '') { $rootScope.setMsg('First Name is required'); return; }
          if ( angular.isUndefined($scope.user.LastName) || $scope.user.LastName == '') { $rootScope.setMsg('Last Name is required'); return; }
          $scope.user.UserName=$scope.user.FirstName;
          $scope.user.Password=$scope.user.FirstName;
          appServices.doActionPost({ Token: $rootScope.token, Obj: $scope.user }, 'user/add').then(function (d) {
              if (d.Status == 'success'){
                  $scope.IsNew=false;
              }
              else $rootScope.setMsg(d.Info);
          });
      }
      $scope.addEmail=function () {
          var hasFoo =false;
          if ( angular.isUndefined($scope.user.Email) || $scope.user.Email == '') { $rootScope.setMsg('email is required'); return; }
              $scope.user.EmailAddress.forEach(function (item) {

                  if(item.isPrimary===true){
                      $rootScope.setMsg('Only one email can be primary');
                      hasFoo=true;
                      return ;
                  }else hasFoo=false;
                  if(item.email===$scope.user.Email){
                      $rootScope.setMsg( $scope.user.Email  +' already in list');
                      hasFoo=true;
                      return ;
                  }else hasFoo=false;
              })
          if(hasFoo===false) {
              $scope.user.EmailAddress.push({
                  email: $scope.user.Email,
                  isPrimary: $scope.user.IsPrimaryEmail != true ? false : $scope.user.IsPrimaryEmail
              });
              $scope.user.Email = null;
              $scope.user.IsPrimaryEmail = false;
          }
          else {
              $scope.user.Email = null;
              $scope.user.IsPrimaryEmail = false;
          }
      }
      
      $scope.deleteEmail=function (idx) {
          $scope.user.EmailAddress.splice(idx,1);
      }
 });