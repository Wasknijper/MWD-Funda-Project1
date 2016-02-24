var templates = (function(){
	var templates = {};
	templates.house = new t('<article id="{{=house.Id}}" class="object" style="background-image: url(\'{{=img}}\')"><a href=#detail"><section><h1>{{=house.Adres}}</h1> <h2>€ {{=price}} k.k.</h2></section></a><article id="{{=house.Id}}-detail" class="object-detail"><a href="#huis/{{=house.Id}}">Close</a></article></arcticle>');
	templates.detail = new t('Loading...');
	return templates; 
}());
	