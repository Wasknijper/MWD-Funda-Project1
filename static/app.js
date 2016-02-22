(function(){
	"use strict";
	var app = {
		oldRoute : "",
		newRoute : "",
		apiUrl : "https://funda.kyrandia.nl/feeds/Aanbod.svc/json/e2d60e885b8742d4b0648300e3703bd7/",
		init: function(){
			//stuff happening
			var dd = utils.request('?type=koop&zo=/amsterdam/tuin/&pagesize=25');
			dd.then(
				function(d){
					console.log(d);
				}
			);

			navigator.geolocation.getCurrentPosition(function(position) {
 				console.log(position.coords.latitude, position.coords.longitude);
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
		request : function(options){
			//call pegasus libirary for the ajax get
			return pegasus(app.apiUrl + options);
		}
	};

	app.init();
}());