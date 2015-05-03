describe('Add movie', function(){
	var controller, scope;

	var FirebaseServiceMock;

  	beforeEach(function(){
    	module('MovieApp');

        FirebaseServiceMock = Mocks.getFirebaseServiceMock();

		// Lisää vakoilijat
	    spyOn(FirebaseServiceMock, 'getAll').and.callThrough();
	    spyOn(FirebaseServiceMock, 'remove').and.callThrough();
	    spyOn(FirebaseServiceMock, 'add').and.callThrough();
	    spyOn(FirebaseServiceMock, 'save').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('MovieAddController', {
	        $scope: scope,
	        FirebaseService: FirebaseServiceMock
	      });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
  	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
  	* on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
  	* toBeCalled-oletusta.
	*/
	it('should be able to add a movie by its name, director, release date and description', function(){
        var name = "whatever";
        var dir = "John Doe";
        var desc = "not available";
        var rel = 2000;

        scope.name = name;
        scope.director = dir;
        scope.releaseYear = rel;
        scope.description = desc;
        scope.add();

        expect(FirebaseServiceMock.add).toHaveBeenCalled();
        var newMovie = FirebaseServiceMock.getAll().slice(-1)[0];
        expect(newMovie.name).toBe(name);
        expect(newMovie.director).toBe(dir);
        expect(newMovie.releaseYear).toBe(rel);
        expect(newMovie.description).toBe(desc);

	});

	/*	
	* Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
	* EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
	* not.toBeCalled-oletusta (muista not-negaatio!).
	*/
	it('should not be able to add a movie if its name, director, release date or description is empty', function(){
        var name = "whatever";
        var dir = "";
        var desc;
        var rel = 2000;

        scope.name = name;
        scope.director = dir;
        scope.releaseYear = rel;
        scope.description = desc;
        scope.add();
        expect(FirebaseServiceMock.add).not.toHaveBeenCalled();
	});
});