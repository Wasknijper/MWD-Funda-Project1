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

			utils.getFromLocalstorage();

			utils.buttonLove = document.getElementById('love');
			utils.buttonReject = document.getElementById('reject');
			utils.buttonContainer = document.getElementById('button_container');

			utils.lovePage = document.getElementById('lovePage');
			utils.rejectPage = document.getElementById('rejectPage');
			utils.settingsPage = document.getElementById('settings');
			
			utils.housesContainer = document.getElementById('houses');
			utils.housesContainer.innerHTML = templates.loading.render();
			
			houseListings.getFormValues();
			houseListings.init();

			window.location = '#discover';
			
			//stuff happening
			window.addEventListener('hashchange', utils.processHash);
			utils.processHash();
		}
	};
}());

(function(){
	app.init();
}());