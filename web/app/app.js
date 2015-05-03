var MovieApp = angular.module('MovieApp', ['firebase', 'ngRoute']);

MovieApp.config(function($routeProvider){
	$routeProvider
        .when('/', {
            controller: 'MovieListController',
            templateUrl: 'app/views/list.html'
        })
        .when('/movies', {
            controller: 'MovieListController',
            templateUrl: 'app/views/list.html'
        })
        .when('/movies/new', {
            controller: 'MovieAddController',
            templateUrl: 'app/views/new.html'
        })
        .when('/movies/:key', {
            controller: 'MovieShowController',
            templateUrl: 'app/views/show.html'
        })
        .otherwise({
            redirectTo: '/'
    });
});