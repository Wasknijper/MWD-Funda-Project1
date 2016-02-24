var utils = (function(){

	return {
		houseCounter: 0,
		housesContainer: "",
		currentHouseId : "",
		currentPage : "",
		currentPageDetail : "",
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
		moveToArray: function(oldArray, newArray){
			var value = oldArray[0];
			newArray.push(value);
			oldArray.shift();
		}
	};
}());