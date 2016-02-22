(function(){
	"use strict";
	var app = {
		oldRoute : "",
		newRoute : "",
		fundaUrl : "https://funda.kyrandia.nl/feeds/Aanbod.svc/json/e2d60e885b8742d4b0648300e3703bd7/",
		googleApi : "https://maps.googleapis.com/maps/api/geocode/json?",
		googleKey : "&key=AIzaSyDyViN5tiPa3bD0qtBjZj8ejkFyp8UOXNY",
		init: function(){
			//stuff happening
			var dd = utils.request(fundaUrl, '?type=koop&zo=/amsterdam/tuin/&pagesize=25');
			dd.then(
				function(d){
					console.log(d);
				}
			);

			navigator.geolocation.getCurrentPosition(function(position) {
				var lat = position.coords.latitude;
				var long = position.coords.longitude;
				var latLong = 'latlng=' + lat + ',' + long;

				var postcode = utils.request(googleApi, latLong, googleKey);
				postcode.then(
					function(d){
						console.log(d);
					}
				)
			});

			utils.processHash();
		}
	};

	var utils = {
		// Hash-based routing, get the hash and run the router
		processHash: function() {
			var hash = location.hash || '#';
			app.oldRoute = app.newRoute;
			app.newRoute = hash.slice(1);
			router.run(app.newRoute);
		},
		request : function(url, options, key){
			//call pegasus libirary for the ajax get
			if(key){
				return pegasus(url + options + key);	
			} else {
				return pegasus(url + options);
			}
		}
	};

	app.init();
}());