MovieApp.controller('UserController', function($scope, $location, AuthenticationService){
  
    $scope.logIn = function(){
        AuthenticationService.logUserIn($scope.email, $scope.password)
                .then(function(){
                    $location.path('/movies');
        })
                .catch(function(){
                    $scope.message = 'Väärä sähköpostiosoite tai salasana!';
        });
    };

    $scope.register = function(){
        AuthenticationService.createUser($scope.newEmail, $scope.newPassword)
                .then(function(){
                    AuthenticationService.logUserIn($scope.newEmail, $scope.newPassword)
                    .then(function(){
                        $location.path('/movies');
            });
        })
                .catch(function(){
                    $scope.message = 'Tapahtui virhe! Yritä uudestaan';
        });
    };
});

MovieApp.controller('MovieListController', function($scope, $location, currentAuth, FirebaseService, OmdbService) {
    if(!currentAuth){
        $location.path('/login');
    }
	$scope.movies = FirebaseService.getAll();

    $scope.remove = function(index){
        FirebaseService.remove(index);
    };

    $scope.find = function() {
        OmdbService.findMovie($scope.search.name, $scope.search.year).success(function(movies) {
            $scope.results = movies.Search || [];
        });
    };
});

MovieApp.controller('MovieAddController', function($scope, $location, currentAuth, FirebaseService) {
    if(!currentAuth){
        $location.path('/login');
    }
    $scope.add = function(){
        if (!($scope.name && $scope.director && $scope.releaseYear && $scope.description))
            return;

        FirebaseService.add({
            name: $scope.name,
            director: $scope.director,
            releaseYear: $scope.releaseYear,
            description: $scope.description
        });
        $location.path('/movies');
    };
});
    
MovieApp.controller('MovieShowController', function($scope, $routeParams, $location, currentAuth, FirebaseService) {
    if(!currentAuth){
        $location.path('/login');
    }
    FirebaseService.getOne($routeParams.key, function(movie) { $scope.movie = movie; });
});

MovieApp.controller('MovieEditController', function($scope, $routeParams, $location, currentAuth, FirebaseService) {
    if(!currentAuth){
        $location.path('/login');
    }
    FirebaseService.getOne($routeParams.key, function(movie) { $scope.movie = movie; });
    $scope.update = function() {
        if (!($scope.movie.name && $scope.movie.director && $scope.movie.releaseYear && $scope.movie.description))
            return;

        FirebaseService.save($scope.movie);
        $location.path('/movies/' + $routeParams.key);
    };
});

