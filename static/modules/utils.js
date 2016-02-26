var utils = (function(){

	return {
		houseCounter: 0,
		housesContainer: "",
		currentHouseId : "",
		currentPage : "",
		currentPageDetail : "",
		buttonContainer: "",
		buttonLove : "",
		buttonReject: "",
		lovePage : "",
		rejectPage : "",
		settingsPage: "",
		processHash: function() { // Hash-based routing, get the hash and run the router
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
		},
		formatNum : function(num){
			// from: http://stackoverflow.com/a/6786040
		    var str = num.toString().split('.');
		    if (str[0].length >= 5) {
		        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1.');
		    }
		    if (str[1] && str[1].length >= 5) {
		        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
		    }
		    return str.join('.');
		},
		moveToArray: function(oldArray, newArray, direction){
			var value = oldArray[0];
			newArray.push(value);
			oldArray.shift();
			list.lastList = direction;
		},
		arrayToObjectArray :function(array, key){
			var newArray = [], value;

			function makeObjs(i){
				var newObj = {};
				value = array[i];
				newObj[key] = value;
				newArray.push(newObj);
			}

			for(var i = 0, len = array.length; i < len; i++){
				makeObjs(i);
			}

			return newArray;
		},
		stringReplace : function(string, search, replace){
    		return string.split(search).join(replace);
		},
		replaceAllInArray : function(array, key, search, replace){
			var obj;
			var newArray = [];
			for(var i = 0, len = array.length; i < len; i++){
				obj = array[i];
				obj[key] = this.stringReplace(obj[key], search, replace);
				newArray.push(obj);
			}
			return newArray;
		},
		saveToLocalstorage : function(){
			var obj = {};
			obj.data = houseListings.data;
			obj.query = houseListings.query;
			obj.currentPage = houseListings.currentPage,
			obj.nextPage = houseListings.nextPage,
			obj.minPrice = houseListings.minPrice;
			obj.maxPrice = houseListings.maxPrice;
			obj.love = list.love;
			obj.reject = list.reject;
			obj.houseDetail = houseListings.houseDetail;

			localStorage.fundaApp = JSON.stringify(obj);
		},
		getFromLocalstorage : function(){
			if(localStorage.fundaApp){
				var obj = JSON.parse(localStorage.fundaApp);
				console.log(obj);
				houseListings.data = obj.data;
				houseListings.query = obj.query;
				houseListings.nextPage = obj.nextPage;
				houseListings.currentPage = obj.currentPage;
				houseListings.minPrice = obj.minPrice;
				houseListings.maxPrice = obj.maxPrice;
				list.love = obj.love;
				list.reject = obj.reject;
				houseListings.houseDetail = obj.houseDetail;
			}
		}
	};
}());