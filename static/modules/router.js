var router = (function(){

	//make a router
	var routes = new Rlite();

	//route for no hash or empty hash
	routes.add('', function () {
  		document.title = 'Home';
	});

	routes.add('huis/:naam', function (route) {
		var pageName = route.params.naam.toString()
  		document.title = pageName;
	});

	return routes;

}());