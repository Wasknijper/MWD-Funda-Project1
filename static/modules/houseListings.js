var houseListings = (function(){

	var _getCurrentStreet = function(cbFunction){
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var long = position.coords.longitude;
			var latLong = 'latlng=' + lat + ',' + long;
			var street;
			var place;

			var postcode = utils.request(app.googleApi, latLong, app.googleKey);
			postcode.then(
				function(d){
					//address_components 3 is plaatsnaam, 1 is straat naam, 0 is huis nummmer
					street = d.results[0].address_components[1].long_name;
					//replace spaces with -, from: http://stackoverflow.com/a/441035
					street = street.replace(/ /g,"-");
					//include place incase the address is common
					place = d.results[0].address_components[3].long_name;
					if (cbFunction instanceof Function){
						cbFunction(place, street);
					} else {
						return {place: place, street: street};
					}

				}
			);
		});
	};

	return { 
		data: '',
		currentPage : 'p1',
		nextPage : '',
		query : '',
		initDone : false,
		init : function(){
			var self = this;
			utils.housesContainer = document.getElementById('houses');
			_getCurrentStreet(function(place, addres){
				var listings;
				self.query = '?type=koop&zo=/'+ place + '/' + addres + '/+5km/';
				var req = utils.request(app.fundaUrl, self.query);
				req.then(
					function(d){
						self.currentPage = d.Paging.HuidigePagina;
						self.nextPage = d.Paging.VolgendeUrl.slice(-3);
						self.data = d.Objects;
						console.log(self.currentPage);
						console.log(self.nextPage);
						var firstId = self.data[0].Id;
						self.show(self.data);
					}
				);
			});
		},
		show : function(houses, isNextPageFunc){
			var self = this;
			utils.currentHouseId = houses[0].Id;
			console.log(utils.currentHouseId);
			utils.housesContainer.innerHTML = "";
			for(var i = 0, len = houses.length; i < len; i++) {
				//lets shove all the houses in a giant div
				var imgUrl = houses[i].FotoLargest;
				imgUrl = imgUrl.replace(/\//g, '\/');
				var price = utils.formatNum(houses[i].Koopprijs);
				utils.housesContainer.innerHTML += templates.house.render({house : houses[i], img: imgUrl, price: price});
			}
			if(this.initDone === false){
				utils.currentPage = document.getElementById(utils.currentHouseId);
				utils.currentPageDetail = document.getElementById(utils.currentHouseId + "-detail");	
				self.initDone = true;
			}
			if(isNextPageFunc !== true){
				router.run('discover');	
			}
		 },
		 getNextPage : function(){
		 	var self = this;
		 	console.log(this.query);
		 	var req = utils.request(app.fundaUrl, this.query + this.nextPage);
		 	req.then(
		 		function(d){
		 			//http://stackoverflow.com/a/31521404
		 			self.data = d.Objects;
					//utils.currentHouseId = self.data[0].Id;
		 			console.log(self.data);
		 			self.show(self.data, true);
		 		}
		 	);
		 }
		// detail : function(id, callback){
		// 	var req = utils.request(app.detailUrl, id);
		// 	console.log(req);
		// 	req.then(
		// 		function(d){
		// 			var data = d;
		// 			if (callback instanceof Function){
		// 				callback(data);
		// 			} else {
		// 				return data;
		// 			}
		// 		}
		// 	);
		// }
	}; 
}());
