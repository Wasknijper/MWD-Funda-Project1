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
		swipe : '',
		discover: function (swipeLeftFunc, swipeRightFunc) {
			var self = this;
			
			var swipe = _createEvent(utils.housesContainer, _options);

			swipe.on("swipeleft", function(ev){ 
				swipeLeftFunc();
				//self.swipe.destroy();
		  		//utils.currentPage.parentNode.removeChild(utils.currentPage);

			});

			swipe.on("swiperight", function(ev){
				swipeRightFunc();
				//self.swipe.destroy();
		  		//utils.currentPage.parentNode.removeChild(utils.currentPage);
			});

			this.swipe = swipe;
		},
		removeListeners: function(){
			if(this.swipe){
				this.swipe.off("swipeleft");
				this.swipe.off("swiperight");
			}
		}
	};
}());