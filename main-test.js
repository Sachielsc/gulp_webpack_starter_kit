'use strict';

var applicationName = "funtown"

var mainModule = angular.module(applicationName,['mgcrea.ngStrap.typeahead','mgcrea.ngStrap.alert','mgcrea.ngStrap.select','ui.router','ngMessages','ngSanitize','flow',
  'auth','manage','alerts','account','buying','selling']);
  
mainModule.config(['$locationProvider', '$urlRouterProvider', '$logProvider','$selectProvider','flowFactoryProvider','$httpProvider',
  function($locationProvider,$urlRouterProvider,$logProvider,$selectProvider,flowFactoryProvider,$httpProvider){
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/');
    $logProvider.debugEnabled(true);    

    angular.extend($selectProvider.defaults, {
        placeholder:'',
        placement:'auto'
    });

    flowFactoryProvider.defaults = {
          target: '/rest/api/upload',
          permanentErrors:[404, 500, 501],
          simultaneousUploads: 3,
          testChunks:false
      };

      $httpProvider.defaults.headers.common["X-Requested-With"]='XMLHttpRequest';    
  }
]);

mainModule.run(['$rootScope','$state','$log','AuthService',
  function($rootScope,$state,$log,AuthService){
    AuthService.setSessionUser().then(function(){
      $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
        $log.debug("state authRequired=",toState.data);
        
        if(toState.data.authRequired && !AuthService.isAuthenticated(toState)){
          event.preventDefault();
          $state.go("login"); 
        }
      });     
    });
  }
]);


angular.element(document).ready(function(){
  angular.bootstrap(document,[applicationName]);
});