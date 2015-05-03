describe('Movie list', function(){
	var controller, scope;

	var FirebaseServiceMock;

  	beforeEach(function(){
    	module('MovieApp');

        FirebaseServiceMock = Mocks.getFirebaseServiceMock();

		// Lisää vakoilijat
	    spyOn(FirebaseServiceMock, 'getAll').and.callThrough();
	    spyOn(FirebaseServiceMock, 'remove').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('MovieListController', {
	        $scope: scope,
	        FirebaseService: FirebaseServiceMock
	      });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/ 
	it('should list all movies from the Firebase', function(){
        expect(FirebaseServiceMock.getAll).toHaveBeenCalled();
        expect(scope.movies).toEqual(FirebaseServiceMock.getAll());
	});

	/* 
	* Testaa, että elokuvan pystyy poistamaan Firebasesta.
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should be able to remove a movie', function(){
        var movieCount = FirebaseServiceMock.getAll().length;
        scope.remove(0);
        expect(FirebaseServiceMock.remove).toHaveBeenCalled();
        expect(FirebaseServiceMock.getAll().length).toBe(movieCount-1);
	});
});