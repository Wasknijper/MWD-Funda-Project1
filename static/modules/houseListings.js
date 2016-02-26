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
		houseDetail: [],
		currentPage : '/p1',
		nextPage : '',
		query : '',
		minPrice : '',
		maxPrice : '',
		price : '',
		restart: false,
		initDone : false,
		init : function(){
			var self = this;
			if(this.minPrice !== '' || this.maxPrice !== ''){
				this.price = this.minPrice + '-' + this.maxPrice;
			}
			if(!localStorage.fundaApp){
				console.log('restart');
				this.restart = false;
				_getCurrentStreet(function(place, addres){
					var listings;
					self.query = '?type=koop&zo=/'+ place + '/' + addres + '/+15km/' + houseListings.price;
					console.log(self.query);
					var req = utils.request(app.fundaUrl, self.query);
					req.then(
						function(d){
							self.currentPage = d.Paging.HuidigePagina;
							self.nextPage = '/p' + d.Paging.VolgendeUrl.split('/p')[1];
							console.log(self.nextPage);
							self.data = d.Objects;
							console.log(self.data);
							var firstId = self.data[0].Id;
							utils.housesContainer.innerHTML = templates.loading.render();
							self.show(self.data);
						}
					);
				});		
			} else {
				self.show(self.data);
			}
		
		},
		show : function(houses, isNextPageFunc){
			var self = this;
			//utils.currentHouseId = houses[0].Id;
			console.log(utils.currentHouseId);
			utils.housesContainer.innerHTML = templates.loading.render();
			for(var i = 0, len = houses.length; i < len; i++) {
				//lets shove all the houses in a giant div
				var imgUrl = houses[i].FotoLargest;
				imgUrl = imgUrl.replace(/\//g, '\/');
				var price = utils.formatNum(houses[i].Koopprijs);
				if(i===0){					
					utils.housesContainer.innerHTML = "";
				}
				utils.housesContainer.innerHTML += templates.house.render({house : houses[i], img: imgUrl, price: price});
			}

			utils.currentHouseId = houses[0].Id;

			if(this.initDone === false){
				utils.currentPage = document.getElementById(utils.currentHouseId);
				utils.currentPage.classList.add('active');
				utils.currentPageDetail = document.getElementById(utils.currentHouseId + "-detail");	
				self.initDone = true;
			}
			if(isNextPageFunc !== true){	
				router.run('discover');	
			} else {
				utils.currentPage = document.getElementById(utils.currentHouseId);
				utils.currentPageDetail = document.getElementById(utils.currentHouseId + "-detail");
				setTimeout(function(){utils.currentPage.classList.add('active');}, 500);
			}
		 },
		 getNextPage : function(){
		 	var self = this;
		 	var req = utils.request(app.fundaUrl, this.query + this.nextPage);
		 	this.restart = true;
		 	console.log(app.fundaUrl + this.query + this.nextPage);
		 	req.then(
		 		function(d){
		 			var preloader = new Image();
    				preloader.onload = function(){
    					self.show(self.data, true);
    				};

    				console.log(d);
		 			//http://stackoverflow.com/a/31521404
		 			self.data = d.Objects;
		 			self.currentPage = self.nextPage;
					self.nextPage = '/p' + d.Paging.VolgendeUrl.split('/p')[1];
		 			preloader.src = self.data[0].FotoLargest;
		 			utils.buttonContainer.classList.remove("invisible");
					//utils.currentHouseId = self.data[0].Id;
		 		}
		 	);
		 },
		 detail : function(id, callback){
		 	var self = this;
			var req = utils.request(app.detailUrl, id);
			console.log(req);
			req.then(
				function(d){
					var data = d;
					if (callback instanceof Function){
						self.houseDetail.push(data);
						utils.saveToLocalstorage();
						callback(data);
					} else {
						return data;
					}
				}
			);
		},
		getFormValues : function(){
			var self = this;
      		var form = document.getElementById('prijs');
      		var fieldMin = document.getElementsByName('minPrice')[0];
      		var fieldMax = document.getElementsByName('maxPrice')[0];
      		var fieldValueMin;
      		var fieldVlaueMax;
      
			form.onsubmit = function(e){
				e.preventDefault();
				var searchResults , newQuery;

				fieldValueMin = fieldMin.value.toLowerCase();
				fieldValueMax = fieldMax.value.toLowerCase();

				if(!fieldValueMin){
					fieldValueMin = '';
				}

				if(!fieldValueMax){
					fieldValueMax = '';
				}

				self.minPrice = fieldValueMin;
				self.maxPrice = fieldValueMax;

				self.price = self.minPrice + '-' + self.maxPrice;

				//we clear the data so new houses are loaded
				self.data = '';

				newQuery = self.query + self.price;
				console.log(app.fundaUrl, newQuery);
				var req = utils.request(app.fundaUrl, newQuery);
				req.then(
					function(d){
						self.currentPage = '/p1'
						self.nextPage = '';
						self.data = d.Objects;
						console.log(self.data);
						var firstId = self.data[0].Id;
						self.show(self.data);
					}
				);

				return false;
			};
		}
	}; 
}());
