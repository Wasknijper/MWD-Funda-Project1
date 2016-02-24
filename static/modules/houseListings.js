var houseListings = (function(){

	var _getCurrentStreet = function(callback){
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var long = position.coords.longitude;
			var latLong = 'latlng=' + lat + ',' + long;
			var street;
			var place;
			console.log(street);

			var postcode = utils.request(app.googleApi, latLong, app.googleKey);
			postcode.then(
				function(d){
					//address_components 3 is plaatsnaam, 1 is straat naam, 0 is huis nummmer
					street = d.results[0].address_components[1].long_name;
					//replace spaces with -, from: http://stackoverflow.com/a/441035
					street = street.replace(/ /g,"-");
					//include place incase the address is common
					place = d.results[0].address_components[3].long_name;
					if (callback instanceof Function){
						callback(place, street);
					} else {
						return {place: place, street: street};
					}

				}
			);
		});
	};

	return { 
		data: '',
		init : function(){
			var self = this;
			_getCurrentStreet(function(place, addres){
				var listings;
				console.log(addres);
				var req = utils.request(app.fundaUrl, '?type=koop&zo=/'+ place + '/' + addres + '/+5km');
				console.log(req);
				req.then(
					function(d){
						self.data = d.Objects;
						self.show(self.data);
					}
				);
			});
		},
		show : function(houses){
			var self = this;
			utils.housesContainer = document.getElementById('houses');
			for(var i = 0, len = houses.length; i < len; i++) {
				//lets shove all the houses in a giant div
				var imgUrl = houses[i].FotoLargest;
				imgUrl = imgUrl.replace(/\//g, '\/');
				var price = utils.formatNum(houses[i].Koopprijs);
				console.log(houses);
				utils.housesContainer.innerHTML += templates.house.render({house : houses[i], img: imgUrl, price: price});
			}
			//add the dragend plugin to it so the user can swipe through it
			dragend = new Dragend(utils.housesContainer, {
	    		pageClass: "object",    		
       			keyboardNavigation : true,
	  	    	afterInitialize: function() {
	        		utils.housesContainer.style.visibility = "visible";
	        	},
	        	onSwipeEnd : function() {
	        		var id = self.data[this.page].Id;
	        		// lets do stuff on the page with this.page, return page number
					window.location = '#huis/' + id;
	        	}
  			});
		},
		detail : function(id, callback){
			var req = utils.request(app.detailUrl, id);
			console.log(req);
			req.then(
				function(d){
					var data = d;
					if (callback instanceof Function){
						callback(data);
					} else {
						return data;
					}
				}
			);
		}
	}; 
}());
