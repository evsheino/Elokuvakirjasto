MovieApp.controller('MovieListController', function($scope, FirebaseService, OmdbService) {
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

MovieApp.controller('MovieAddController', function($scope, $location, FirebaseService) {
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
    
MovieApp.controller('MovieShowController', function($scope, $routeParams, FirebaseService) {
    FirebaseService.getOne($routeParams.key, function(movie) { $scope.movie = movie; });
});

MovieApp.controller('MovieEditController', function($scope, $routeParams, $location, FirebaseService) {
    FirebaseService.getOne($routeParams.key, function(movie) { $scope.movie = movie; });
    $scope.update = function() {
        if (!($scope.movie.name && $scope.movie.director && $scope.movie.releaseYear && $scope.movie.description))
            return;

        FirebaseService.save($scope.movie);
        $location.path('/movies/' + $routeParams.key);
    };
});

