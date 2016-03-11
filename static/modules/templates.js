var templates = (function(){
	var templates = {};
	templates.house = new t('<article id="{{=house.Id}}" class="object" title="{{=house.Adres}}" style="background-image: url(\'{{=img}}\')"><article id="{{=house.Id}}-detail" class="object-detail"><a href="#detail/{{=house.Id}}"><section><h1>{{=house.Adres}}</h1> <h2>€ {{=price}} k.k.</h2><svg class="icon icon-info"><use xlink:href="#icon-info"></use></svg></section></a><section class="info">Close</section></article></arcticle>');
	templates.loading = new t('<div class="loading">Loading...</div>');
	templates.detail = new t('<table> <tr><th>Bouw</th><th></th></tr> <tr><td>Soort woonhuis</td><td>{{=house.SoortWoning}}</td></tr> <tr><td>Soort bouw</td><td>{{=house.Bouwvorm}}</td></tr> <tr><td>Bouwjaar</td><td>{{=house.Bouwjaar}}</td></tr> <tr><td>Soort dak</td><td>{{=house.SoortDak}}</td></tr> <tr><th>Indeling</th><th></th></tr> <tr><td>Aantal kamers</td><td>{{=house.AantalKamers}}</td></tr> <tr><td>Aantal badkamers</td><td>{{=house.AantalBadkamers}}</td></tr> <tr><td>Aantal woonlagen</td><td>{{=house.AantalWoonlagen}}</td></tr> <tr><td>Voorzieningen</td><td>{{=house.Voorzieningen}}</td></tr> <tr><th>Oppervlakten en inhoud</th><th></th></tr> <tr><td>Woonoppervlakte</td><td>{{=house.WoonOppervlakte}} m2</td></tr> <tr><td>Perceeloppervlakte</td><td>{{=house.PerceelOppervlakte}} m2</td></tr> <tr><td>Inhoud</td><td>{{=house.Inhoud}} m3</td></tr> <tr><th>Buiten- & Bergruimte</th><th></th></tr> <tr><td>Tuin</td><td>{{=house.Tuin}}</td></tr> <tr><td>Schuur/berging</td><td>{{=house.SchuurBerging}}</td> </table> <section class="fotos"><h1>Foto\'s</h1>{{@pics}}<img src="{{=_val.src}}">{{/@pics}}</section>');
	templates.list = new t('<a role="close" href="#discover"><svg><use xlink:href="#icon-cross"></use></svg></a>{{@list}}<article><a href="{{=_val.URL}}"><img src="{{=_val.FotoLarge}}" alt="Foto van {{=_val.Adres}}"><h1>{{=_val.Adres}}</h1>{{=_val.PrijsGeformatteerdHtml}}</a></article>{{/@list}}');
	return templates; 
}());

// <table class="bouw" border="1">
// <tr><th>Bouw</th></tr>
// <tr><td>Soort woonhuis</td><td>Row:1 Cell:1</td></tr>
// <tr><td>Soort bouw</td><td>Row:1 Cell:1</td></tr>
// <tr><td>Bouwjaar</td><td>Row:1 Cell:1</td></tr>
// <tr><td>Soort dak</td><td>Row:1 Cell:1</td></tr>
// </table>
// <table class="inhoud" border="1">
// <tr><th>Oppervlakten en inhoud</th></tr>
// <tr><td>Woonoppervlakte</td><td>Row:1 Cell:1</td></tr>
// <tr><td>Perceeloppervlakte</td><td>Row:1 Cell:1</td></tr>
// <tr><td>Inhoud</td><td>Row:1 Cell:1</td></tr>
// </table>
// <table class="inhoud" border="1">
// <tr><th>Buiten- & Bergruimte</th></tr>
// <tr><td>Tuin</td><td>Row:1 Cell:1</td></tr>
// <tr><td>Schuur/berging</td><td>dffs</td>

// </table>