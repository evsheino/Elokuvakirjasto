MovieApp.service('FirebaseService', function($firebase){
    var sync = $firebase(new Firebase("helloweso.firebaseio.com/movies"));
    var movies = sync.$asArray();
    
    this.getAll = function() {
        return movies;
    };
    
    this.getOne = function(key, done){
        movies.$loaded(function(){
            done(movies.$getRecord(key));
        });
    };
    
    this.remove = function(index) {
        movies.$remove(index);
    };
    
    this.add = function(movie) {
        movies.$add(movie);
    };
    
    this.save = function(movie) {
        movies.$save(movie);
    };
});