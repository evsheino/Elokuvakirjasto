var Mocks = {};

Mocks.getFirebaseServiceMock = function() {
    var movies = [
        {
            $id: "-Jo6JPvfVV_7dXv09g4D",
            name: "2001: A Space Odyssey",
            director: "Stanley Kubrick",
            releaseYear: 1968,
            description: "Humanity finds a mysterious, obviously artificial, object buried beneath the Lunar surface and, with the intelligent computer H.A.L. 9000, sets off on a quest."
        },
        {
            $id: "-Jo6J_lLZrs_pl1a43MF",
            name: "Pulp Fiction",
            director: "Quentin Tarantino",
            releaseYear: 1994,
            description: "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
        }
    ];

    return {
        getAll: function() {
            return movies;
        },
        getOne: function(key, done) {
            for (var i=0, len=movies.length; i < len; i++) {
                if (movies[i].$id === key)
                    return done(movies[i]);
            }
        },
        remove: function(index) {
            movies.splice(index, 1);
        },
        add: function(movie) {
            movies.push(movie);
        },
        save: function(movie) {
            for (var i=0, len=movies.length; i < len; i++) {
                if (scope.movies[i].$id === movie.$id) {
                    movies[i] = movie;
                    break;
                }
            }
        }
    };
};

