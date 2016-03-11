# MWD-Funda-Project1
Project 1 voor de minor web development

Hier te bekijken: http://wasknijper.github.io/MWD-Funda-Project1/#discover

#Browser Technologies

##Screen-reader
Het lukt me nog niet om de icons juist voor te laten lezen via de screenreader, ookal gebruik ik een title in de svg. Ook kan de screenreader niet bij de detail tekst zonder dat je er met je muis opklikt. Verder leest hij ook de huizen nog voor die niet actief zijn.

##Afbeeldingen
De app is ook te gebruiken zonder afbeeldingen, maar hierdoor moet te gebruiker wel 

##Custom Fonts
Ik gebruik geen speciale fonts voor de body teksten in mijn app. Wel gebruikte ik een icon font, deze heb ik veranderd naar inline-svgs met een title, hierdoor weet de gebruiker wat de knop doet zonder afbeeldingen.

##Javascript(volledig)
Zonder JS doet mijn app het niet, omdat ik data ophaal via XHR en gebruik maak van JS om naar de volgende items te gaan.
Ik zou de call naar de api op de server kunnen doen via php of node.js en deze dan als html terug serveren. 

##Kleur
Er zit voldoende contrast in mijn app, waardoor hij ook bruikbaar is voor mensen die kleurenblind zijn.

##Breedband internet
De html en CSS worden al snel ingeladen, ook als de gebruiker een slechte verbinding heeft. Er staat een loader in de content, waardoor de gebruiker weet dat er iets gebeurt. Het duurt daarna een paar seconden voordat de huizen verschijnen. Hetzelfde geet voor het inladen van extra details van het huidige huis. 

##Cookies
Ik maak geen gebruik van cookies in dit project. Ik zou wel cookies kunnen gebruiken als iemand geen localstorage heeft en viceversa. 

##Javascript deels - WiFiHotspots/HTTPS
De app werkt ook zonder https.

##Javascript contentblokkers
Niet kunnen testen

##localStorage
De app slaat sommige data op in de local host, zoals de huidige huizen en de huizen die je hebt geliked of gereject. Als er geen localStorage is werkt de app nog wel, maar is de data weg als je de browser refresht. Ik kan hier voor een exporteer en importeer functie maken. De exporteer heeft dan een JSON string die de gebruiker zelf kan opslaan en later weer importeren om weer verder te kunnen.

##CDN's
Ik gebruik geen plugins die ergens anders gehost staan. Wel doe ik op dit moment een API call naar een andere server. Het liefst zou ik de API en de app op de zelfde server laten draaien, omdat de app zonder API niet werkt. (Dus als de api server er uitligt dan ligt de app er automatisch ook uit)

##Ad blockers
Door add blockers wordt er op dit moment nog niks geblokeerd. Er staan verder ook geen advertenties in de app.

##Muis/trackpad
Alle knoppen zijn bereikbaar dmv. tab. Wel is het nu mogelijk om ook te tabben naar de details van de niet actieve huizen. Dit kan ik oplossen door met js een tab-index van -1 meetegeven en deze weg te halen bij het huis dan actief is, zo kan de gebruiker niet perongelijk de details opvragen van een huis wat nog niet aan de beurt is. 
