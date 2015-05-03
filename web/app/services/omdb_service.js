MovieApp.service('OmdbService', function($http){
    this.findMovie = function(name, year) {
        var params = {};
        if (name) params.s = name;
        if (year) params.y = year;
        return $http.get('http://www.omdbapi.com/', { params: params });
    };
});
