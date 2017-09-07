/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var applicationName = "funtown";

var mainModule = angular.module(applicationName, ['mgcrea.ngStrap.typeahead', 'mgcrea.ngStrap.alert', 'mgcrea.ngStrap.select', 'ui.router', 'ngMessages', 'ngSanitize', 'flow', 'auth', 'manage', 'alerts', 'account', 'buying', 'selling']);

mainModule.config(['$locationProvider', '$urlRouterProvider', '$logProvider', '$selectProvider', 'flowFactoryProvider', '$httpProvider', function ($locationProvider, $urlRouterProvider, $logProvider, $selectProvider, flowFactoryProvider, $httpProvider) {
  $locationProvider.html5Mode(false);
  $urlRouterProvider.otherwise('/');
  $logProvider.debugEnabled(true);

  angular.extend($selectProvider.defaults, {
    placeholder: '',
    placement: 'auto'
  });

  flowFactoryProvider.defaults = {
    target: '/rest/api/upload',
    permanentErrors: [404, 500, 501],
    simultaneousUploads: 3,
    testChunks: false
  };

  $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
}]);

mainModule.run(['$rootScope', '$state', '$log', 'AuthService', function ($rootScope, $state, $log, AuthService) {
  AuthService.setSessionUser().then(function () {
    $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
      $log.debug("state authRequired=", toState.data);

      if (toState.data.authRequired && !AuthService.isAuthenticated(toState)) {
        event.preventDefault();
        $state.go("login");
      }
    });
  });
}]);

angular.element(document).ready(function () {
  angular.bootstrap(document, [applicationName]);
});

/***/ })
/******/ ]);