var router = (function(){

	var _icon;
	var _firstLaunch = true;
	var _buttonInit = false;
	//make a router
	var routes = new Rlite();

	//route for the swipe page
	routes.add('discover', function () {
		var _oldPage;

  		document.title = 'Home';
  		if(_firstLaunch === false){
			
			if(utils.currentPageDetail){
				_icon = utils.currentPageDetail.childNodes[0].querySelector('.icon');
				_icon.firstChild.setAttribute('xlink:href', '#icon-info');
			}

			utils.lovePage.classList.remove('active');
			utils.rejectPage.classList.remove('active');
			utils.settingsPage.classList.remove('active');
	  		utils.buttonContainer.classList.remove('invisible');
			utils.saveToLocalstorage();
			//only add the id to utils if data it exists
			if(typeof houseListings.data[0] !== 'undefined'){
				utils.currentHouseId = houseListings.data[0].Id;
			}

			//see if the divs are removed
	  		if(utils.currentPage){
	  			_oldPage = utils.currentPage;
				utils.currentPage = document.getElementById(utils.currentHouseId);

				if(_oldPage !== utils.currentPage){
					if(utils.currentPage){
		  				utils.currentPage.classList.add('active');
					}//utils.currentPage.classList.remove('active');
		  			if(list.lastList){
			  			_oldPage.classList.add(list.lastList);	

						_oldPage.addEventListener("transitionend", function(){
							_oldPage.classList.remove('active');
							_oldPage.removeEventListener("transitionend");
							if(houseListings.data.length === 0){
							//If the array is empty we want new objects!
							//utils.housesContainer.innerHTML = templates.loading.render();
								utils.buttonContainer.classList.add("invisible");

							}
						});
		  			}
				}
	  		}
	  		
	  		//var pageName = route.params.name.toString();
	  		if (utils.currentPageDetail){
				utils.currentPageDetail.firstChild.href = '#detail/' + utils.currentHouseId;
				utils.currentPageDetail.classList.remove('visible');
				//window.location = "#a";
	  		}

	  		//make the div visible by adding the active class

	  		//get detail div to show incase they click the link
	  		utils.currentPageDetail = document.getElementById(utils.currentHouseId + '-detail');
	  		//add the swipe events, run route when swipe is done
	  		// utils.buttonLove(){

	  		// }
  		} else {
  			//if it it the first launch, we add a whole bunch of eventlisteners.
			touch.discover(function right(){
				//move to the reject array
				utils.moveToArray(houseListings.data, list.reject, 'left');
				router.run('discover');
			}, function left(){
				//move to the love array
				utils.moveToArray(houseListings.data, list.love, 'right');
				//run route again to see the new house
				router.run('discover');
			});	

			list.addClickEvent(utils.buttonLove, list.love, 'right');
			list.addClickEvent(utils.buttonReject, list.reject, 'left');

  			_firstLaunch = false;
  		}
	});

	routes.add('detail/:name', function (route) {
		console.log(_icon.firstChild.xlink);
		_icon.firstChild.setAttribute('xlink:href', '#icon-cancel-circle');
		utils.currentPageDetail.classList.add('visible');
		utils.buttonContainer.classList.add('invisible');
		utils.currentPageDetail.firstChild.href = '#discover';
		utils.currentPageDetail.lastChild.innerHTML = templates.loading.render();
		houseListings.detail(utils.currentHouseId, function(data){
			var pics = utils.arrayToObjectArray(data['Media-Foto'], 'src');
			pics = utils.replaceAllInArray(pics, 'src', 'klein', 'groot');
			console.log(pics);
			utils.currentPageDetail.lastChild.innerHTML = templates.detail.render({house: data, pics : pics});
		});
       		//utils.currentPageDetail.removeEventListener('hashchange', function(){ router.run('discover')});
	});

	routes.add('love', function(){
		utils.lovePage.classList.add('active');
		utils.rejectPage.classList.remove('active');
		utils.settingsPage.classList.remove('active');
		utils.buttonContainer.classList.add('invisible');
		utils.lovePage.innerHTML = templates.list.render({list: list.love});
	});

	routes.add('reject', function(){
		utils.rejectPage.classList.add('active');
		utils.settingsPage.classList.remove('active');
		utils.lovePage.classList.remove('active');
		utils.buttonContainer.classList.add('invisible');
		utils.rejectPage.innerHTML = templates.list.render({list: list.reject});
	});

	routes.add('settings', function(){
		utils.settingsPage.classList.add('active');
		utils.rejectPage.classList.remove('active');
		utils.lovePage.classList.remove('active');
	});

	routes.add('reset', function(){
		var confrimMsg = confirm("Door te reseten wis je alle informatie, dus ook de opgeslage huizen.\n \n Weet je zeker dat je wilt reseten?");
		if (confrimMsg === true) {
		    localStorage.clear();
		   window.location = '';
		} else {
		   window.location = '#discover';
		}
	});

	return routes;

}());