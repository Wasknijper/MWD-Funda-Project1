var router = (function(){

	var _firstLaunch = true;
	//make a router
	var routes = new Rlite();

	//route for no hash or empty hash
	routes.add('discover', function () {
  		document.title = 'Home';
  		if(houseListings.data.length === 0){
			console.log("the end!");
			houseListings.getNextPage();
	  		//utils.currentPage.classList.remove('active');
			//_firstLaunch = true;
		} 
	
		if(typeof houseListings.data[0] !== 'undefined'){
			utils.currentHouseId = houseListings.data[0].Id;
		}
		console.log(houseListings.data);
		_firstLaunch = false;
  		utils.currentPage.classList.remove('active');
  		//var pageName = route.params.name.toString();
  		if (utils.currentPageDetail){
			utils.currentPageDetail.classList.remove('visible');
  		}
  		utils.currentPage = document.getElementById(utils.currentHouseId);
  		utils.currentPage.classList.add('active');
  		utils.currentPageDetail = document.getElementById(utils.currentHouseId + '-detail');

		touch.discover(function left(){
			utils.moveToArray(houseListings.data, list.love);
			router.run('discover');
		}, function right(){
			utils.moveToArray(houseListings.data, list.reject);
			router.run('discover');
		});
  		//document.title = pageName;
  		//console.log(pageName)
	});

	routes.add('huis/:name', function (route) {
		
	});

	// routes.add('detail/:name', function (route) {
	// 	var houseId = route.params.name.toString();
 //  		document.title = houseId;
 //  		houseListings.detail(houseId, function(data){
 //  			console.log(data);
 //  			utils.currentPageDetail.classList.add('visible');
 //  		});
	// });

	return routes;

}());