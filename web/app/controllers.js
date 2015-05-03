MovieApp.controller('MovieListController', function($scope, FirebaseService) {
	$scope.movies = FirebaseService.getAll();

    $scope.remove = function(index){
        FirebaseService.remove(index);
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
    
MovieApp.controller('MovieShowController', function($scope, FirebaseService) {
});

MovieApp.controller('MovieUpdateController', function($scope, FirebaseService) {
    $scope.update = function(movie){
        FirebaseService.save(movie);
    };
});

