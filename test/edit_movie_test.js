describe('Edit movie', function(){
	var controller, scope;

	var FirebaseServiceMock, RouteParamsMock;

  	beforeEach(function(){
    	module('MovieApp');

        FirebaseServiceMock = Mocks.getFirebaseServiceMock();
        RouteParamsMock = Mocks.getRouteParamsMock();

		// Lisää vakoilijat
	    spyOn(FirebaseServiceMock, 'save').and.callThrough();
	    spyOn(FirebaseServiceMock, 'getOne').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('MovieEditController', {
	        $scope: scope,
	        FirebaseService: FirebaseServiceMock,
            $routeParams: RouteParamsMock
	      });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/
  	it('should fill the edit form with the current information about the movie', function(){
        expect(FirebaseServiceMock.getOne).toHaveBeenCalled();
        var movie;
        FirebaseServiceMock.getOne(RouteParamsMock.key, function(m) { movie = m; });
        expect(scope.movie.name).toBe(movie.name);
        expect(scope.movie.director).toBe(movie.director);
        expect(scope.movie.releaseYear).toBe(movie.releaseYear);
        expect(scope.movie.description).toBe(movie.description);
  	})

  	/* 
  	* Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should be able to edit a movie by its name, director, release date and description', function(){
        expect(FirebaseServiceMock.getOne).toHaveBeenCalled();

        var name = "uusi";
        var dir = "uusi dir";
        var rel = "uusi rel";
        var desc = "uusi desc";

        scope.movie.name = name;
        scope.movie.director = dir;
        scope.movie.releaseYear = rel;
        scope.movie.description = desc;
        scope.update();

        expect(FirebaseServiceMock.save).toHaveBeenCalled();

        var movie;
        FirebaseServiceMock.getOne(RouteParamsMock.key, function(m) { movie = m; });

        expect(movie.name).toBe(name);
        expect(movie.director).toBe(dir);
        expect(movie.releaseYear).toBe(rel);
        expect(movie.description).toBe(desc);
	});

	/*
	* Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
	* Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
  	* käyttämällä not.toBeCalled-oletusta.
	*/
	it('should not be able to edit a movie if its name, director, release date or description is empty', function(){
        expect(FirebaseServiceMock.getOne).toHaveBeenCalled();
        var name = "";
        var dir = "uusi dir";
        var rel = "uusi rel";
        var desc = "uusi desc";

        scope.movie.name = name;
        scope.movie.director = dir;
        scope.movie.releaseYear = rel;
        scope.movie.description = desc;
        scope.update();

        expect(FirebaseServiceMock.save).not.toHaveBeenCalled();
	});
});