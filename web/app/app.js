var MovieApp = angular.module('MovieApp', ['firebase', 'ngRoute']);

MovieApp.config(function($routeProvider){
	$routeProvider
        .when('/', {
            controller: 'MovieListController',
            templateUrl: 'app/views/list.html',
            resolve: {
                currentAuth: function(AuthenticationService) {
                    return AuthenticationService.checkLoggedIn();
                }
            }
        })
        .when('/movies', {
            controller: 'MovieListController',
            templateUrl: 'app/views/list.html',
            resolve: {
                currentAuth: function(AuthenticationService) {
                    return AuthenticationService.checkLoggedIn();
                }
            }
        })
        .when('/movies/new', {
            controller: 'MovieAddController',
            templateUrl: 'app/views/new.html',
            resolve: {
                currentAuth: function(AuthenticationService) {
                    return AuthenticationService.checkLoggedIn();
                }
            }
        })
        .when('/movies/:key', {
            controller: 'MovieShowController',
            templateUrl: 'app/views/show.html',
            resolve: {
                currentAuth: function(AuthenticationService) {
                    return AuthenticationService.checkLoggedIn();
                }
            }
        })
        .when('/movies/:key/edit', {
            controller: 'MovieEditController',
            templateUrl: 'app/views/edit.html',
            resolve: {
                currentAuth: function(AuthenticationService) {
                    return AuthenticationService.checkLoggedIn();
                }
            }
        })
        .when('/login', {
            controller: 'UserController',
            templateUrl: 'app/views/login.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});

MovieApp.config(['$httpProvider', function($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
    }]);

MovieApp.run(function(AuthenticationService, $rootScope, $location){
    $rootScope.logOut = function(){
        AuthenticationService.logUserOut();
        $location.path("/login");
    };

    $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn;
});