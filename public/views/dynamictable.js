issueTrackerApp.registerCtrl('dynamictablecontroller',
    function dynamictablecontroller($scope, $rootScope, $http, $location, appServices, $cookies,validationService) {


        $scope.Save = function () {
            console.log('save data is ' + $scope.personalDetails);
            var s=$scope.personalDetails;
            var arr = [];
            for (var i = 0; i < $scope.personalDetails.length; i++) {
                arr.push($scope.personalDetails[i].Name);
            }

            console.log('array is ' + JSON.stringify(arr));
             appServices.doActionPost({ Token: $rootScope.token, Obj: arrayData }, 'userDetails').then(function (d) {
             if (d.Status == 'success') $location.path('/projects');
             else $rootScope.setMsg(d.Info);
             });
        }

    });
