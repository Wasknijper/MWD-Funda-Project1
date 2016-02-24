var touch = (function(){
	//dankjewel aan Leander voor de structuur
	var _options = {
  		dragLockToAxis: true,
  		dragBlockHorizontal: true
	};

	var _createEvent = function (element, options) { // creating a new Hammer function
			if(options){
				return new Hammer(element, options);
			} else {
				return new Hammer(element);
			}

		};

		
		// Make the Hammer functions specific to the pages

	return {
		discover: function (swipeLeftFunc, swipeRightFunc) {

			if(swipe){
				swipe.off("swipeleft");
				swipe.off("swiperight");
			}

			var swipe = _createEvent(utils.housesContainer, _options);
			swipe.on("swipeleft", function(ev){ 
				swipeLeftFunc();
				swipe.off("swipeleft");
				swipe.off("swiperight");
		  		//utils.currentPage.parentNode.removeChild(utils.currentPage);

			});

			swipe.on("swiperight", function(ev){
				swipeRightFunc();
				swipe.off("swipeleft");
				swipe.off("swiperight");
		  		//utils.currentPage.parentNode.removeChild(utils.currentPage);
			});

		}
	};
}());