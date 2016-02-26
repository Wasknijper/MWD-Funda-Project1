var list = (function(){
	
	return {
		love : [],
		reject: [],
		lastList : '',
		addClickEvent : function(ele, list, direction){
			ele.addEventListener('click', function(){
				utils.moveToArray(houseListings.data, list, direction);
				if(houseListings.data.length === 0){
				//If the array is empty we want new objects!
				//utils.housesContainer.innerHTML = templates.loading.render();
					utils.currentPage.classList.add(direction);
					utils.currentPage.addEventListener('transitionend', function(){
						houseListings.getNextPage();
						utils.currentPage.removeEventListener("transitionend");	
					});
					
				}
				router.run('discover');
			});
		}
	};

}());