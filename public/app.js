'use strict';

let issueTrackerApp=angular.module('issueTrackerApp',['ngRoute','ngCookies','cgNotify','ngSanitize','ui.bootstrap']);

function getRoute(name) {
  return {
    templateUrl: 'views/' + name + '.html?r=' + FTVer,
    controller: name.substring(name.indexOf('/') + 1) + 'controller',
    resolve: {
      load: function ($q, $route, $rootScope) {
        let deferred = $q.defer();
        $script(['views/' + name + '.js?r=' + FTVer], function () {
          $rootScope.$apply(function () {
            deferred.resolve();
          });
        });
        return deferred.promise;
      }
    }
  };
}
issueTrackerApp.config(function ($routeProvider, $controllerProvider, $locationProvider) {
  issueTrackerApp.registerCtrl = $controllerProvider.register;
  $routeProvider
        .when('/', getRoute('login'))
        .when('/login', getRoute('login'))
        .when('/myprofile', getRoute('userprofile'))
        .when('/dashboard', getRoute('dashboard'))
        .when('/projects', getRoute('projects'))
        .when('/dynamictable', getRoute('dynamictable'))
        .when('/issuetype', getRoute('issuetype'))
        .when('/status', getRoute('status'))
        .when('/users', getRoute('userprofile'))
        .when('/projects/:ID',getRoute('projectdetail'))
        .when('/issue/:ID',getRoute('issuedetail'))
        .when('/searchaccount',getRoute('searchaccount'))
        .when('/editor',getRoute('editor'))
        .when('/swagger',{
          redirectTo:'swagger_dist/index.html'
        })
        .otherwise({ redirectTo: '/notfound' });
  $locationProvider.html5Mode(true);
});
issueTrackerApp.service('appServices', appServices);
issueTrackerApp.controller('mainCtrl', mainCtrl);

issueTrackerApp.run(function ($rootScope, $location, $cookies, appServices) {
  let token = $cookies.get('UserToken');
  if (token) $rootScope.token = token;
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    $rootScope.attParam = null;
    if (!navigator.onLine) $rootScope.setMsg('Network not connected! Please check internet connection.');
        // Get user if token is there but no user
    if ($rootScope.mUser === null) {
      if ($rootScope.token) {
        appServices.getUserByToken(token).then(function (d) {
          if (d.Status === 'success') {
            $rootScope.mUser = d.objdata;
            if ($rootScope.mUser !== null && next.templateUrl === 'views/login.html?r=0aq'){
              $location.path('/dashboard');
            }
            $rootScope.$broadcast('userReady', null);
            $rootScope.processForward();
          } else $rootScope.goSignin(next.templateUrl);
        });
      }      else $rootScope.goSignin(next.templateUrl);
    }
  });
});

function mainCtrl($scope, $location, $rootScope, $cookies, notify, $http, appServices) {
  $rootScope.mUser = null;
  $rootScope.attParam = null;
  $rootScope.isBusy = 0;
  $scope.loc = $location;
  $scope.mainMenu = {};
  $scope.addToken = function (str) {
    return { Search: str, Token: $rootScope.token };
  };
  $rootScope.setMsg = function (msg, succ) {
    notify.closeAll();
    notify({ message: msg, classes: (succ ? 'alert-success' : 'alert-danger'), duration: 5000 });
  };
  $rootScope.goSignin = function (url) {
    if (url && url.indexOf('login.html') < 0 && url.indexOf('login.html') < 0 && url.indexOf('passwordreset.html') < 0 && url.indexOf('validate.html') < 0) {
      $rootScope.setMsg('Please sign-in to continue...');
      $location.path('/signin');
    }
  };
    // to get module
  $scope.getModules = function () {
    appServices.doActionGet({ Token: $rootScope.token }, 'modules').then(function (d) {
      if (d.Status === 'success'){
        $scope.mainModule = d.objdata;
      }
    });
  };


  $scope.isMenu=false;
  $scope.getModuleMenu=function(id){
    appServices.doActionGet({ Token: $rootScope.token }, 'modules/'+ id + '').then(function (d) {
      if (d.Status === 'success'){
        $scope.isMenu=true;
        $scope.moduleMenu = d.objdata;
      }
    });
  };

  $rootScope.processForward=function(){
    $scope.getModules();
  };

  $rootScope.signout = function () {
    $rootScope.mUser = null;
    $rootScope.token = null;
    $cookies.remove('UserToken');
    $location.path('/login');
  };
}

function getTableObj(tableid, token, initSort, apipath, refreshTableFunc) {
  let itf = {};
  itf.id = tableid;
  itf.Rows = {};
  itf.api = apipath;
  itf.SortBy = appStor.gettext(tableid + 'sort', initSort);
  itf.Token = token;
  itf.SortDesc = false;
  itf.RPP = appStor.getnumber(tableid + 'rpp', 8);
  itf.TotalRows = 0;
  itf.CurPage = 1;
  itf.NumPages = 1;
  itf.Params = [];
  itf.Filters = [];
  itf.FilBtnClass = function () {
    let cls = '';
    for (let i = 0; i < this.Filters.length; i++) {
      if (this.Filters[i] > '') cls = 'btn-warning';
    }
    return cls;
  };
  itf.clearFil = function () {
    for (let i = 0; i < this.Filters.length; i++) {
      this.Filters[i] = '';
    }
  };
  itf.setSort = function (newSort) {
    if (newSort === this.SortBy) this.SortDesc = !this.SortDesc; else this.SortDesc = false;
    this.SortBy = newSort;
    appStor.save(tableid + 'sort', newSort);
    refreshTableFunc();
  };
  itf.setRPP = function (nRPP) {
    this.RPP = nRPP;
    appStor.save(tableid + 'rpp', nRPP);
    refreshTableFunc();
  };
  itf.chPage = function (inc,obj) {
    obj.CurPage += inc;
    if (obj.CurPage > obj.NumPages) obj.CurPage = obj.NumPages;
    if (obj.CurPage === 0) obj.CurPage = 1;
    refreshTableFunc();
  };
  itf.setRows = function (aRes) {
    this.Rows = aRes.objdata;
    this.TotalRows = aRes.Count;
    this.NumPages = Math.floor((this.TotalRows + this.RPP - 1) / this.RPP);
    if (this.CurPage > this.NumPages) this.CurPage = this.NumPages;
    if (this.CurPage === 0) this.CurPage = 1;
  };
  return itf;
}

// email validation
issueTrackerApp.factory('validationService', function () {
  return {
    Email: function (email) {
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  };
});

issueTrackerApp.filter('UTC2Local', function () {
  return function (date) {
    if (date === null) {
      return date;
    }
    return new Date(date + 'Z');
  };
});

// Custom Directive

issueTrackerApp.directive('userDetails',function () {
  return {
    restrict: 'E',
    templateUrl: 'views/userDirective.html',
    scope:true,
    link:function (attribute,element,scope) {
      scope.personalDetails = [{
        Name: '',
        Email: [{}],
        Address: [{}]
      }];
      scope.addNew = function () {
        scope.personalDetails.push({
          'Email': [{}],
          'Address': [{}]
        });
      };
      scope.removeRow = function (idx) {
        scope.personalDetails.splice(idx, 1);
      };

      scope.addMoreEmail = function (idx) {
        scope.personalDetails[idx].Email.push({
                   // Email:''
        });
      };

      scope.addMoreAddr = function (idx) {
        scope.personalDetails[idx].Address.push({
                   // Address:''
        });
      };
    }
  };
});

issueTrackerApp.directive('projectDirective',function () {
  return{
    restrict:'AE',
    templateUrl:'views/project-directive.html',
    scope:{
      projectList:'=',
      projectTitle:'@',
      plugin:'&'
    },
    controller:function ($scope,$element,$attrs) {
      $scope.removeProject=function (projectid) {
      };
    }
  };
});

issueTrackerApp.directive('contextMenu',function ($compile) {
  let contextMenu = {};
  contextMenu.restrict='AE',
    contextMenu.scope={
      menuItem:'='
    }
    contextMenu.link=function (scope,elem,attrs) {
    elem.on('contextmenu',function (e) {
       e.preventDefault();
       if($("#dropdown") )
         $("#dropdown").remove();
        elem.append( $compile(scope.menuItem)(scope));
        $("#dropdown").css("left", e.clientX);
        $("#dropdown").css("top", e.clientY);
      });
      elem.on("mouseleave", function(e){
        if($("#dropdown") )
          $("#dropdown").remove();
      });
    };
    return contextMenu;
});

issueTrackerApp.directive('customPagination',function () {
  return{
    restrict:'AE',
    templateUrl:'views/data-pagination.html',
    scope:{
      curPage:'=',
      numPages:'=',
      changePage:'&',
      curObj:'='
    }
  };
});


let appStor = {
  save: function (key, value) {
    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  gettext: function (key, def) {
    if (typeof (Storage) !== 'undefined') {
      let val = localStorage.getItem(key); if (val) return val; else return def;
    } else return def;
  },
  getnumber: function (key, def) {
    if (typeof (Storage) !== 'undefined') {
      let val = localStorage.getItem(key); if (val && !isNaN(val)) return parseInt(val); else return def;
    } else return def;
  }
};

