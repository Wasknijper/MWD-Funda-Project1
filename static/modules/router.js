var router = (function(){

	//make a router
	var routes = new Rlite();

	//route for no hash or empty hash
	routes.add('', function () {
  		document.title = 'Home';
	});

	routes.add('huis/:naam', function (route) {
		var pageName = route.params.naam.toString();
		utils.currentPage = document.getElementById(pageName);
		utils.currentPageDetail = document.getElementById(pageName + '-detail');
		if(dragend){
			dragend.pageContainer = utils.housesContainer.childNodes[0];
		}
		utils.currentPageDetail.classList.remove('visible');
  		document.title = pageName;
  		console.log(pageName)
	});

	routes.add('huis/:naam/detail', function (route) {
		var houseId = route.params.naam.toString();
  		document.title = houseId;
  		houseListings.detail(houseId, function(data){
  			console.log(data);
  			utils.currentPageDetail.classList.add('visible');
  			dragend.pageContainer = utils.placeholder;
  			console.log(dragend);
  		});
	});

	return routes;

}());