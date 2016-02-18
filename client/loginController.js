var app = angular.module("apiApp")
.controller('LoginController', function($scope, $http) {
    $scope.user = {};
    $scope.posts = [];

    $scope.login = function() {
        $http({
            method: "POST",
            url: "/api/login",
            data: $scope.user
        }).then(function(data) {
            // Save the JWT to localStorage so we can use it later
            localStorage.setItem('jwt', data.data.jwt);
        }).catch(function(err){
            console.log(err);
            console.log("BAD THING ^^^");
        });
    }

    $scope.getPosts = function() {
        $http({
            method: "GET",
            url: '/api/posts'
        }).then(function(data) {
            $scope.posts = data.data;
        });
    }
});