var app = (function(){
	"use strict";
	return {
		oldRoute : "",
		newRoute : "",
		fundaUrl : "http://funda.kyrandia.nl/feeds/Aanbod.svc/json/e2d60e885b8742d4b0648300e3703bd7/",
		detailUrl: "http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/e2d60e885b8742d4b0648300e3703bd7/koop/",
		googleApi : "https://maps.googleapis.com/maps/api/geocode/json?",
		googleKey : "&key=AIzaSyDyViN5tiPa3bD0qtBjZj8ejkFyp8UOXNY",
		listings : '',
		init: function(){
			var self = this;
			
			utils.placeholder = document.getElementById('placeholder');
			houseListings.init();
			//stuff happening
			window.addEventListener('hashchange', utils.processHash);
			utils.processHash();
		}
	};
}());

(function(){
	app.init();
}());