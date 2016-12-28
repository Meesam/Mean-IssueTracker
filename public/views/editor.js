'use strict';

issueTrackerApp.registerCtrl('editorcontroller',
  function projectdetailcontroller($scope, $rootScope, $http, $location,$routeParams ,
                                   appServices, $cookies,$filter) {


    //tinymce.init({ selector:'textarea' });
    $(".textarea").wysihtml5();
    $scope.htmlContext='<ul id="dropdown"><li><a href="#">Item 1</a></li><li><a href="#">Item 2</a> </li></ul>';

  });
