var app = angular.module("apiApp", ['ngRoute', 'ngResource']);

app.config(function($routeProvider, $locationProvider, $httpProvider){

  $routeProvider
  .when('/',{
    templateUrl: "/client/templates/login.html",
    controller: "LoginController",
  })
  .otherwise({redirectTo: '/'});

  $locationProvider.html5Mode(true);

  // Registed the interceptor for our application
  $httpProvider.interceptors.push("AuthInterceptor");
});

// This interceptor pre-processes every HTTP call made using
// the $http service. Specifically, it adds a single header
// of the form:
// Authorization: 'Bearer jwtString'
app.service("AuthInterceptor", function($window,$location,$q){
  return {
    request: function(config){
      var token = localStorage.getItem('jwt');
      
      // If the JWT exists in local storage, add an authorization header
      if(token) config.headers.Authorization = 'Bearer ' + token;

      return config;
    }
  };
});
