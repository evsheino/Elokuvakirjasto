describe('Show movie', function(){
	var controller, scope;

	var FirebaseServiceMock, RouteParamsMock;

  	beforeEach(function(){
    	module('MovieApp');

        FirebaseServiceMock = Mocks.getFirebaseServiceMock();
        RouteParamsMock = Mocks.getRouteParamsMock();

		// Lisää vakoilijat
	    spyOn(FirebaseServiceMock, 'getOne').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('MovieShowController', {
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
  	* Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should show current movie from Firebase', function(){
        expect(FirebaseServiceMock.getOne).toHaveBeenCalled();
        expect(scope.movie.name).toBe("2001: A Space Odyssey");
	});
});